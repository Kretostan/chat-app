import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../db/database.service";

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
}
