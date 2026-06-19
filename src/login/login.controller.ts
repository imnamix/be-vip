import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { LoginService } from "./login.service";
import { LoginDTO } from "./entity/login.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ForgotDTO } from "./entity/forgot.dto";
import { ResetDTO } from "./entity/reset.dto";
import { OtpDTO } from "./entity/otp.dto";
@ApiTags("Login")
@Controller("login")
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post("auth/login")
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginDTO) {
    try {
      return await this.service.login(data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new user",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("forgotPassword")
  @ApiBody({ type: ForgotDTO })
  async forgotPassword(@Body() obj: ForgotDTO) {
    try {
      return await this.service.forgotPassword(obj);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while sending otp",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    // return this.service.forgotPassword(obj);
  }

  @Post("verifyOtp")
  @ApiBody({ type: OtpDTO })
  async verifyOtp(@Body() obj: OtpDTO) {
    try {
      return await this.service.verifyOtp(obj);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while verifying otp",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("resetPassword")
  @ApiBody({ type: ResetDTO })
  async resetPassword(@Body() obj: ResetDTO) {
    try {
      return await this.service.resetPassword(obj);
    } catch (error) {
      return error;
    }
  }

  // @Post("auth/verify")
  // verify(@Body() obj: any) {
  //   // return this.service.verify(obj);
  // }
}
