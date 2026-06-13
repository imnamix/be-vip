import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_User } from "../user/entity/user.entity";
import { LoginDTO } from "./entity/login.dto";
import { EmailService } from "../EmailService/mailService";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ForgotDTO } from "./entity/forgot.dto";
import { ResetDTO } from "./entity/reset.dto";
import { UserDTO } from "../user/entity/user.dto";
import { OtpDTO } from "./entity/otp.dto";
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(obj: LoginDTO) {
    try {
      const { email, password } = obj;
      const user = await this.userRepo.findOne({
        where: { email },
        select: ["id", "email", "password", "name"],
      });

      if (!user) {
        return { success: false, statusCode: 404, message: "User Not Found" };
      }

      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        console.log("❌ Login Failed - Wrong Password");
        console.log("Email:", email);
        console.log("Correct Password Hash:", user.password);
        console.log("Provided Password:", password);
        return {
          success: false,
          statusCode: 401,
          message: "Invalid credentials",
        };
      }

      const payload = { email: email, id: user.id };
      const token = this.jwtService.sign(payload);

      return {
        success: true,
        message: "User login successfully",
        statusCode: 200,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: token,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async forgotPassword(payload: ForgotDTO) {
    try {
      const { email } = payload;
      if (!email) {
        throw new BadRequestException({
          message: "Email is required.",
          errorCode: "EC001",
        });
      }

      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000);
      };
      const otp: number = generateOTP();

      //send otp by email
      const isOtpSend = await this.emailService.sendOtpEmail(user.email, otp);

      //add timestamp
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

      if (isOtpSend) {
        const updatedUser = {
          ...user,
          otp: otp,
          otpExpiresAt: otpExpiresAt,
        };
        await this.userRepo.save(updatedUser);
        return {
          status: "success",
          data: {
            message: "OTP has been sent to your email.",
          },
        };
      } else {
        return {
          status: "failed",
          data: {
            message: "Enable to send OTP.",
          },
        };
      }
    } catch (error) {
      return error;
    }
  }

  async verifyOtp(obj: OtpDTO) {
    try {
      const { email, otp } = obj;
      const user = await this.userRepo.findOne({
        where: { email: email },
        select: ["id", "email", "otp", "otpExpiresAt"],
      });

      if (!user) {
        return {
          success: false,
          message: "Email Not Found",
        };
      }
      if (!user.otp || !user.otpExpiresAt) {
        // Check if user exists and has an OTP
        return {
          success: false,
          message: "OTP not found. Please request a new OTP.",
        };
      }

      if (new Date() > user.otpExpiresAt) {
        await this.userRepo.update(
          { email },
          { otp: null, otpExpiresAt: null },
        );
        return {
          success: false,
          message: "OTP has expired. Please request a new one.",
        };
      }

      if (otp != user.otp) {
        return {
          success: false,
          message: "Invalid OTP, Please try again",
        };
      }

      await this.userRepo.update({ email }, { otp: null, otpExpiresAt: null });

      return {
        status: "success",
        data: {
          message: "OTP verified successfully.",
        },
      };
    } catch (error) {
      return error;
    }
  }

  // async verify(obj) {
  //   const user = await this.userRepo.findOne({
  //     where: { id: obj.id },
  //   });

  //   if (!user) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         error: 'Email Is Not Found. Try To register Again',
  //         erroCode: 'EC010',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return true;
  // }

  async resetPassword(body: ResetDTO) {
    try {
      const { email, newPassword } = body;

      if (!email || !newPassword) {
        return {
          success: false,
          message: "Email and New Password are required.",
        };
      }

      const user = await this.userRepo.findOne({
        where: { email },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);
      const newPayload = {
        email: email,
        password: hashPassword,
        ...user,
      };

      await this.userRepo.save(newPayload);

      return {
        status: "success",
        data: {
          message: "Password reset successfully",
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: "Internal server error",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
