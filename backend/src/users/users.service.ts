import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../db/database.service";
import { users } from "../db/schema";

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db.select().from(users);
  }
}
