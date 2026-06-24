import { Controller, Get, UseGuards } from "@nestjs/common";
import type { AuthUser } from "shared";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("/rooms")
  @UseGuards(JwtAuthGuard)
  async loadRooms(@CurrentUser() user: AuthUser) {
    return await this.chatService.loadRooms(user.id);
  }
}
