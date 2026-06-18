import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { and, eq, or, sql } from "drizzle-orm";
import type { AuthUser, RegisterValues } from "shared";
import { DatabaseService } from "../db/database.service";
import { sessions, users } from "../db/schema";

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterValues) {
    const existing = await this.databaseService.db
      .select()
      .from(users)
      .where(or(eq(users.email, dto.email), eq(users.username, dto.username)))
      .limit(1);

    if (existing.length) {
      throw new ConflictException("Username or email already exists.");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const [newUser] = await this.databaseService.db
      .insert(users)
      .values({
        username: dto.username,
        email: dto.email,
        passwordHash,
      })
      .returning();

    const { passwordHash: _, ...result } = newUser;
    return result;
  }

  async login(
    login: string,
    password: string,
    deviceName: string,
  ): Promise<string> {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(or(eq(users.email, login), eq(users.username, login)))
      .limit(1);

    if (!user) {
      throw new ConflictException("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new ConflictException("Invalid credentials");
    }

    const [session] = await this.databaseService.db
      .select()
      .from(sessions)
      .where(
        and(eq(sessions.deviceName, deviceName), eq(sessions.userId, user.id)),
      );

    const payload = {
      sub: user.id,
      username: user.username,
    };

    if (!session) {
      const [newSession] = await this.databaseService.db
        .insert(sessions)
        .values({
          userId: user.id,
          deviceName,
          isCurrent: true,
          lastUsedAt: sql`datetime("now")`,
        })
        .returning();

      return this.jwtService.sign({ ...payload, sessionId: newSession.id });
    }

    await this.databaseService.db
      .update(sessions)
      .set({
        isCurrent: true,
        lastUsedAt: sql`datetime("now")`,
      })
      .where(
        and(eq(sessions.deviceName, deviceName), eq(sessions.userId, user.id)),
      );

    return this.jwtService.sign({ ...payload, sessionId: session.id });
  }

  async logout(user: AuthUser) {
    await this.databaseService.db
      .update(sessions)
      .set({ isCurrent: false, lastUsedAt: sql`datetime("now")` })
      .where(
        and(eq(sessions.userId, user.id), eq(sessions.id, user.sessionId)),
      );
  }
}
