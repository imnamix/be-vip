import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { EN_User } from '../user/entity/user.entity';
import { EmailService } from '../EmailService/mailService';
import { status } from '../global/system.enums';
import { LoginDTO } from './entity/login.dto';
import { ForgotDTO } from './entity/forgot.dto';
import { OtpDTO } from './entity/otp.dto';
import { ResetDTO } from './entity/reset.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { RefreshTokenPayload } from '../auth/interfaces/refresh-payload.interface';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(obj: LoginDTO) {
    const { email, password } = obj;

    const user = await this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.password')
      .leftJoinAndSelect('u.role', 'role')
      .where('u.email = :email', { email })
      .getOne();

    if (!user) {
      return { success: false, statusCode: 404, message: 'User not found' };
    }

    if (user.status !== status.ACTIVE) {
      return {
        success: false,
        statusCode: 403,
        code: 'ACCOUNT_DISABLED',
        message: 'Your account has been disabled. Please contact the administrator.',
      };
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return { success: false, statusCode: 401, message: 'Invalid credentials' };
    }

    const roleId = user.role?.id ?? null;

    const accessTokenPayload: JwtPayload = { userId: user.id, roleId };
    const refreshTokenPayload: RefreshTokenPayload = { userId: user.id, roleId, type: 'refresh' };

    const accessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(refreshTokenPayload as any, { expiresIn: '7d' });

    return {
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleName: user.roleName,
          profilePicture: user.profilePicture,
        },
        permissions: user.role?.permissions ?? {},
        permissionVersion: user.role?.updated_at?.toISOString() ?? null,
      },
    };
  }

  async refreshAccessToken(token: string) {
    let decoded: RefreshTokenPayload;
    try {
      decoded = this.jwtService.verify(token) as RefreshTokenPayload;
    } catch {
      return { success: false, statusCode: 401, message: 'Invalid or expired refresh token' };
    }

    if (decoded.type !== 'refresh') {
      return { success: false, statusCode: 401, message: 'Not a refresh token' };
    }

    const user = await this.userRepo.findOne({
      where: { id: decoded.userId },
      relations: { role: true },
    });

    if (!user) {
      return { success: false, statusCode: 404, message: 'User not found' };
    }

    if (user.status !== status.ACTIVE) {
      return {
        success: false,
        statusCode: 403,
        code: 'ACCOUNT_DISABLED',
        message: 'Account is disabled',
      };
    }

    const roleId = user.role?.id ?? null;

    const accessToken = this.jwtService.sign(
      { userId: user.id, roleId } satisfies JwtPayload,
      { expiresIn: '1h' },
    );
    const newRefreshToken = this.jwtService.sign(
      { userId: user.id, roleId, type: 'refresh' } satisfies RefreshTokenPayload,
      { expiresIn: '7d' },
    );

    return {
      success: true,
      statusCode: 200,
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        permissions: user.role?.permissions ?? {},
        permissionVersion: user.role?.updated_at?.toISOString() ?? null,
      },
    };
  }

  async forgotPassword(payload: ForgotDTO) {
    const { email } = payload;
    if (!email) {
      throw new BadRequestException({ message: 'Email is required.', errorCode: 'EC001' });
    }

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const isOtpSend = await this.emailService.sendOtpEmail(user.email, otp);
    if (isOtpSend) {
      await this.userRepo.save({ ...user, otp, otpExpiresAt });
      return { status: 'success', data: { message: 'OTP has been sent to your email.' } };
    }
    return { status: 'failed', data: { message: 'Unable to send OTP.' } };
  }

  async verifyOtp(obj: OtpDTO) {
    const { email, otp } = obj;

    const user = await this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'otp', 'otpExpiresAt'],
    });

    if (!user) return { success: false, message: 'Email not found' };
    if (!user.otp || !user.otpExpiresAt) {
      return { success: false, message: 'OTP not found. Please request a new OTP.' };
    }
    if (new Date() > user.otpExpiresAt) {
      await this.userRepo.update({ email }, { otp: null, otpExpiresAt: null });
      return { success: false, message: 'OTP has expired. Please request a new one.' };
    }
    if (otp != user.otp) {
      return { success: false, message: 'Invalid OTP, please try again' };
    }

    await this.userRepo.update({ email }, { otp: null, otpExpiresAt: null });
    return { status: 'success', data: { message: 'OTP verified successfully.' } };
  }

  async resetPassword(body: ResetDTO) {
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return { success: false, message: 'Email and new password are required.' };
    }

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return { success: false, message: 'User not found.' };

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepo.update({ email }, { password: hashPassword });

    return { status: 'success', data: { message: 'Password reset successfully' } };
  }
}
