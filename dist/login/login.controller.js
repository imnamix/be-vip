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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const login_dto_1 = require("./entity/login.dto");
const swagger_1 = require("@nestjs/swagger");
const forgot_dto_1 = require("./entity/forgot.dto");
const reset_dto_1 = require("./entity/reset.dto");
const otp_dto_1 = require("./entity/otp.dto");
let LoginController = class LoginController {
    constructor(service) {
        this.service = service;
    }
    async login(data) {
        try {
            return await this.service.login(data);
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while adding new user",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async forgotPassword(obj) {
        try {
            return await this.service.forgotPassword(obj);
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while sending otp",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyOtp(obj) {
        try {
            return await this.service.verifyOtp(obj);
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while verifying otp",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resetPassword(obj) {
        try {
            return await this.service.resetPassword(obj);
        }
        catch (error) {
            return error;
        }
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Post)("auth/login"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("forgotPassword"),
    (0, swagger_1.ApiBody)({ type: forgot_dto_1.ForgotDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_dto_1.ForgotDTO]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("verifyOtp"),
    (0, swagger_1.ApiBody)({ type: otp_dto_1.OtpDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDTO]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)("resetPassword"),
    (0, swagger_1.ApiBody)({ type: reset_dto_1.ResetDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_dto_1.ResetDTO]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "resetPassword", null);
exports.LoginController = LoginController = __decorate([
    (0, swagger_1.ApiTags)("Login"),
    (0, common_1.Controller)("login"),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
//# sourceMappingURL=login.controller.js.map