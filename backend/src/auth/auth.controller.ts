import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() dto: RegisterDto,
  ) {
    return this.authService.register(res, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(res, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }
}
