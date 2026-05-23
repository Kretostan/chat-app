import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { type Response } from "express";
import {
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
    const token = await this.authService.login(dto.login, dto.password);

    response.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return { message: "Logged in succesfully" };
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user);

    response.clearCookie("access_token", { path: "/" });

    return { message: "Logged out" };
  }

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user) {
    return user;
  }
}
