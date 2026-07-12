import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { type Response } from "express";
import {
  type AuthUser,
  type LoginValues,
  loginSchema,
  type RegisterValues,
  registerSchema,
} from "shared";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  async register(
    @Body(new ZodValidationPipe(registerSchema)) dto: RegisterValues,
  ) {
    return this.authService.register(dto);
  }

  @Post("/login")
  async login(
    @Body(new ZodValidationPipe(loginSchema)) dto: LoginValues,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, username, userId } = await this.authService.login(
      dto.username,
      dto.password,
      dto.deviceName,
      dto.sessionUuid,
    );

    response.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return { username, userId };
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("access_token", { path: "/" });
    return;
  }

  @Get("/profile")
  @UseGuards(JwtAuthGuard)
  async profile(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Get("/sessions")
  @UseGuards(JwtAuthGuard)
  async sessions(@CurrentUser() user: AuthUser) {
    return this.authService.sessions(user);
  }

  @Post("/sessions/:id/logout")
  @UseGuards(JwtAuthGuard)
  async removeSession(
    @Param("id") params: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.authService.removeSession(params, user.sessionId);
  }
}
