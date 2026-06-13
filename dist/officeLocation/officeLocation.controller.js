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
exports.OfficeLocationController = void 0;
const common_1 = require("@nestjs/common");
const officeLocation_service_1 = require("./officeLocation.service");
const swagger_1 = require("@nestjs/swagger");
const officeLocation_dto_1 = require("./entity/officeLocation.dto");
const deleteLoc_dto_1 = require("./entity/deleteLoc.dto");
let OfficeLocationController = class OfficeLocationController {
    constructor(officeLocService) {
        this.officeLocService = officeLocService;
    }
    async createOfficeLoc(obj) {
        try {
            const newOffLoc = await this.officeLocService.create(obj);
            return {
                success: true,
                message: "Office Location Created Successfully.",
                data: newOffLoc,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while adding new office location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllOffLoc(page = 1, limit = 1000, search) {
        try {
            const allLocations = await this.officeLocService.getAllOfficeLoc({
                page,
                limit,
                search,
            });
            return {
                success: true,
                message: "Office Location Fetched Successfully.",
                data: allLocations.data,
                count: allLocations.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching office locations",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLocById(id) {
        try {
            const officeLocation = await this.officeLocService.getLocById(id);
            return {
                success: officeLocation.success,
                message: officeLocation.message,
                data: officeLocation.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching office location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateOffLoc(id, payload) {
        try {
            const prevLocation = await this.officeLocService.updateOfficeLocation(id, payload);
            return {
                success: prevLocation.success,
                message: prevLocation.message,
                data: prevLocation.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating office location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteOffLoc(deleteDTO) {
        try {
            const deletedLocation = await this.officeLocService.deleteOffceLoc(deleteDTO.ids);
            return {
                success: deletedLocation.success,
                message: deletedLocation.message,
                data: deletedLocation.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating office location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.OfficeLocationController = OfficeLocationController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: officeLocation_dto_1.OfficeLocationDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [officeLocation_dto_1.OfficeLocationDTO]),
    __metadata("design:returntype", Promise)
], OfficeLocationController.prototype, "createOfficeLoc", null);
__decorate([
    (0, common_1.Get)("getAllOfficeLocation"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], OfficeLocationController.prototype, "getAllOffLoc", null);
__decorate([
    (0, common_1.Get)("getAllOfficeLocation/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OfficeLocationController.prototype, "getLocById", null);
__decorate([
    (0, common_1.Put)("updateOfficeLoc/:id"),
    (0, swagger_1.ApiBody)({ type: officeLocation_dto_1.OfficeLocationDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, officeLocation_dto_1.OfficeLocationDTO]),
    __metadata("design:returntype", Promise)
], OfficeLocationController.prototype, "updateOffLoc", null);
__decorate([
    (0, common_1.Delete)("deleteOfficeLoc"),
    (0, swagger_1.ApiBody)({ type: deleteLoc_dto_1.deleteLocDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteLoc_dto_1.deleteLocDTO]),
    __metadata("design:returntype", Promise)
], OfficeLocationController.prototype, "deleteOffLoc", null);
exports.OfficeLocationController = OfficeLocationController = __decorate([
    (0, swagger_1.ApiTags)("Office Location"),
    (0, common_1.Controller)("officeLocation"),
    __metadata("design:paramtypes", [officeLocation_service_1.OfficeLocationService])
], OfficeLocationController);
//# sourceMappingURL=officeLocation.controller.js.map