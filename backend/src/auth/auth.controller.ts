import {
  Body,
  Controller,
  Get,
  Post,
  Req,
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
    const token = await this.authService.login(
      dto.login,
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
    return;
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("access_token", { path: "/" });
    response.status(204).end();
    return;
  }

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: AuthUser) {
    return user;
  }
}
