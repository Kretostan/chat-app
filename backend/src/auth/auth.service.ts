import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
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
    sessionUuid: string,
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

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const [existingSession] = await this.databaseService.db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.sessionUuid, sessionUuid),
          eq(sessions.userId, user.id),
        ),
      );

    if (!existingSession) {
      const [newSession] = await this.databaseService.db
        .insert(sessions)
        .values({
          userId: user.id,
          deviceName,
          lastUsedAt: sql`datetime('now')`,
          sessionUuid,
        })
        .returning();

      // INFO: GDZIE? \/
      // FIX: Sesje, które wysłał frontend, a nie ma ich na backendzie

      return this.jwtService.sign({ ...payload, sessionId: newSession.id });
    }

    await this.databaseService.db
      .update(sessions)
      .set({ lastUsedAt: sql`datetime('now')` })
      .where(eq(sessions.id, existingSession.id));

    return this.jwtService.sign({
      ...payload,
      sessionId: existingSession.id,
    });
  }

  async sessions(user: AuthUser) {
    return await this.databaseService.db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, user.id));
  }

  async removeSession(params: string, sessionId: number) {
    const id = parseInt(params, 10);
    if (id === sessionId) {
      throw new BadRequestException("Cannot delete current session");
    }

    return await this.databaseService.db
      .delete(sessions)
      .where(eq(sessions.id, id));
  }
}
