import { LoginService } from "./login.service";
import { LoginDTO } from "./entity/login.dto";
import { ForgotDTO } from "./entity/forgot.dto";
import { ResetDTO } from "./entity/reset.dto";
import { OtpDTO } from "./entity/otp.dto";
export declare class LoginController {
    private readonly service;
    constructor(service: LoginService);
    login(data: LoginDTO): Promise<any>;
    forgotPassword(obj: ForgotDTO): Promise<any>;
    verifyOtp(obj: OtpDTO): Promise<any>;
    resetPassword(obj: ResetDTO): Promise<any>;
}
