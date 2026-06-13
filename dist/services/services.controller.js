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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_dto_1 = require("./entity/services.dto");
const services_service_1 = require("./services.service");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async create(payload) {
        try {
            const data = await this.servicesService.create(payload);
            return {
                success: true,
                message: "Service created successfully.",
                data: data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while creating service",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll() {
        try {
            const data = await this.servicesService.getAll();
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching services",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const data = await this.servicesService.getById(id);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching service",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const data = await this.servicesService.update(id, payload);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating service",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const data = await this.servicesService.delete(id);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting service",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: services_dto_1.ServicesDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [services_dto_1.ServicesDTO]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: services_dto_1.ServicesDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, services_dto_1.ServicesDTO]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "delete", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)("Services"),
    (0, common_1.Controller)("services"),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map