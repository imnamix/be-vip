import { Repository } from "typeorm";
import { EN_User } from "../user/entity/user.entity";
import { LoginDTO } from "./entity/login.dto";
import { EmailService } from "../EmailService/mailService";
import { JwtService } from "@nestjs/jwt";
import { ForgotDTO } from "./entity/forgot.dto";
import { ResetDTO } from "./entity/reset.dto";
import { OtpDTO } from "./entity/otp.dto";
export declare class LoginService {
    private readonly userRepo;
    private readonly emailService;
    private readonly jwtService;
    constructor(userRepo: Repository<EN_User>, emailService: EmailService, jwtService: JwtService);
    login(obj: LoginDTO): Promise<any>;
    forgotPassword(payload: ForgotDTO): Promise<any>;
    verifyOtp(obj: OtpDTO): Promise<any>;
    resetPassword(body: ResetDTO): Promise<{
        success: boolean;
        message: string;
        status?: undefined;
        data?: undefined;
    } | {
        status: string;
        data: {
            message: string;
        };
        success?: undefined;
        message?: undefined;
    }>;
}
