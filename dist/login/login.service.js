"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const mailService_1 = require("../EmailService/mailService");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let LoginService = class LoginService {
    constructor(userRepo, emailService, jwtService) {
        this.userRepo = userRepo;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async login(obj) {
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
        }
        catch (error) {
            return error;
        }
    }
    async forgotPassword(payload) {
        try {
            const { email } = payload;
            if (!email) {
                throw new common_1.BadRequestException({
                    message: "Email is required.",
                    errorCode: "EC001",
                });
            }
            const user = await this.userRepo.findOne({ where: { email } });
            if (!user) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            const generateOTP = () => {
                return Math.floor(1000 + Math.random() * 9000);
            };
            const otp = generateOTP();
            const isOtpSend = await this.emailService.sendOtpEmail(user.email, otp);
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
            }
            else {
                return {
                    status: "failed",
                    data: {
                        message: "Enable to send OTP.",
                    },
                };
            }
        }
        catch (error) {
            return error;
        }
    }
    async verifyOtp(obj) {
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
                return {
                    success: false,
                    message: "OTP not found. Please request a new OTP.",
                };
            }
            if (new Date() > user.otpExpiresAt) {
                await this.userRepo.update({ email }, { otp: null, otpExpiresAt: null });
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
        }
        catch (error) {
            return error;
        }
    }
    async resetPassword(body) {
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
        }
        catch (error) {
            throw new common_1.HttpException({
                message: "Internal server error",
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.EN_User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailService_1.EmailService,
        jwt_1.JwtService])
], LoginService);
//# sourceMappingURL=login.service.js.map