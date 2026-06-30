import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { LoginService } from './login.service';
import { LoginDTO } from './entity/login.dto';
import { ForgotDTO } from './entity/forgot.dto';
import { ResetDTO } from './entity/reset.dto';
import { OtpDTO } from './entity/otp.dto';
import { RefreshTokenDTO } from './entity/refresh-token.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginDTO) {
    try {
      return await this.service.login(data);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Login failed', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('auth/refresh')
  @ApiBody({ type: RefreshTokenDTO })
  @UsePipes(new ValidationPipe())
  async refresh(@Body() dto: RefreshTokenDTO) {
    try {
      return await this.service.refreshAccessToken(dto.refreshToken);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Token refresh failed', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('forgotPassword')
  @ApiBody({ type: ForgotDTO })
  async forgotPassword(@Body() obj: ForgotDTO) {
    try {
      return await this.service.forgotPassword(obj);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while sending OTP', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verifyOtp')
  @ApiBody({ type: OtpDTO })
  async verifyOtp(@Body() obj: OtpDTO) {
    try {
      return await this.service.verifyOtp(obj);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while verifying OTP', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('resetPassword')
  @ApiBody({ type: ResetDTO })
  async resetPassword(@Body() obj: ResetDTO) {
    try {
      return await this.service.resetPassword(obj);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while resetting password', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
