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
exports.BrandInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const brandinfo_dto_1 = require("./entity/brandinfo.dto");
const brandinfo_service_1 = require("./brandinfo.service");
let BrandInfoController = class BrandInfoController {
    constructor(brandinfoService) {
        this.brandinfoService = brandinfoService;
    }
    async createOrUpdate(payload) {
        try {
            const data = await this.brandinfoService.create(payload);
            return {
                success: true,
                message: "Brand Info saved successfully.",
                data: data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while saving brand info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async get() {
        try {
            const data = await this.brandinfoService.get();
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Brand Info Fetched Successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Brand Info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(payload) {
        try {
            const data = await this.brandinfoService.update(payload);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Brand Info Updated Successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating brand info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BrandInfoController = BrandInfoController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: brandinfo_dto_1.BrandInfoDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brandinfo_dto_1.BrandInfoDTO]),
    __metadata("design:returntype", Promise)
], BrandInfoController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)("get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandInfoController.prototype, "get", null);
__decorate([
    (0, common_1.Put)("update"),
    (0, swagger_1.ApiBody)({ type: brandinfo_dto_1.BrandInfoDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brandinfo_dto_1.BrandInfoDTO]),
    __metadata("design:returntype", Promise)
], BrandInfoController.prototype, "update", null);
exports.BrandInfoController = BrandInfoController = __decorate([
    (0, swagger_1.ApiTags)("Brand Info"),
    (0, common_1.Controller)("brandinfo"),
    __metadata("design:paramtypes", [brandinfo_service_1.BrandInfoService])
], BrandInfoController);
//# sourceMappingURL=brandinfo.controller.js.map