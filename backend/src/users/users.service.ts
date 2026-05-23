import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DatabaseService } from "../db/database.service";
import { users } from "../db/schema";

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db.select().from(users);
  }

  async getUser(username: string) {
    console.log(username);
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    const { passwordHash: _, ...result } = user;
    return result;
  }
}
