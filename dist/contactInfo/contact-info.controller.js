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
exports.ContactInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_info_service_1 = require("./contact-info.service");
const create_contact_info_dto_1 = require("./dto/create-contact-info.dto");
let ContactInfoController = class ContactInfoController {
    constructor(contactInfoService) {
        this.contactInfoService = contactInfoService;
    }
    async create(payload) {
        try {
            const data = await this.contactInfoService.create(payload);
            return {
                success: true,
                message: "Contact info created successfully.",
                data: data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while creating contact info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll(status) {
        try {
            const data = await this.contactInfoService.getAll(status);
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
                message: "Error while fetching contact info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const data = await this.contactInfoService.getById(id);
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
                message: "Error while fetching contact info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const data = await this.contactInfoService.update(id, payload);
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
                message: "Error while updating contact info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const data = await this.contactInfoService.delete(id);
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
                message: "Error while deleting contact info",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ContactInfoController = ContactInfoController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: create_contact_info_dto_1.CreateContactInfoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_info_dto_1.CreateContactInfoDto]),
    __metadata("design:returntype", Promise)
], ContactInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, type: String }),
    __param(0, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactInfoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactInfoController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_contact_info_dto_1.CreateContactInfoDto]),
    __metadata("design:returntype", Promise)
], ContactInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactInfoController.prototype, "delete", null);
exports.ContactInfoController = ContactInfoController = __decorate([
    (0, swagger_1.ApiTags)("Contact Info"),
    (0, common_1.Controller)("contact-info"),
    __metadata("design:paramtypes", [contact_info_service_1.ContactInfoService])
], ContactInfoController);
//# sourceMappingURL=contact-info.controller.js.map