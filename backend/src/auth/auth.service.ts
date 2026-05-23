import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";
import type { RegisterValues } from "shared";
import { DatabaseService } from "../db/database.service";
import { users } from "../db/schema";

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

  async login(login: string, password: string): Promise<string> {
    const user = await this.databaseService.db
      .select()
      .from(users)
      .where(or(eq(users.email, login), eq(users.username, login)))
      .limit(1);

    if (!user.length) {
      throw new ConflictException("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user[0].passwordHash);
    if (!isValid) {
      throw new ConflictException("Invalid credentials");
    }

    const payload = {
      sub: user[0].id,
      username: user[0].username,
      tokenVersion: user[0].tokenVersion,
    };
    return this.jwtService.sign(payload);
  }

  async logout(user) {
    await this.databaseService.db
      .update(users)
      .set({ tokenVersion: user.token_version + 1 })
      .where(eq(users.id, user.id));
  }
}
