import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { eq } from "drizzle-orm";
import { Strategy } from "passport-jwt";
import { DatabaseService } from "../db/database.service";
import { users } from "../db/schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private databaseService: DatabaseService) {
    super({
      jwtFromRequest: (req) => req?.cookies?.access_token ?? null,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? "super-secret",
    });
  }

  async validate(payload: {
    sub: number;
    username: string;
    tokenVersion: number;
  }) {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.username, payload.username))
      .limit(1);

    if (!user || user.tokenVersion !== payload.tokenVersion)
      throw new UnauthorizedException();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token_version: user.tokenVersion,
    };
  }
}
