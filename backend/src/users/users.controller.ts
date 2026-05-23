import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get("/profile")
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user) {
    return this.usersService.getUser(user.username);
  }
}
