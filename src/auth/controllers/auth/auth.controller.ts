import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import SignUpDTO from "../../DTO/NewUser.dto";
import { AuthService } from "../../services/auth/auth.service";
const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/sign-up")
  @UsePipes(ValidationPipe)
  async signUp(@Body() body: SignUpDTO, @Res() response: Response) {
    const { id, email, username } = await this.authService.createNewUser(body);
    const [accessToken, refreshToken] = await this.authService.signTokens(
      id,
      username,
    );
    response
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: REFRESH_COOKIE_MAX_AGE,
        secure: true,
      })
      .json({ id, email, accessToken });
  }
  @Get("/users")
  async getUsers() {
    return this.authService.getUsers();
  }
}
