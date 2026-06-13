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
exports.WorkIndustryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const workIndustry_dto_1 = require("./entity/workIndustry.dto");
const workIndustry_service_1 = require("./workIndustry.service");
const deleteWorkIndustry_dto_1 = require("./entity/deleteWorkIndustry.dto");
let WorkIndustryController = class WorkIndustryController {
    constructor(workIndustryService) {
        this.workIndustryService = workIndustryService;
    }
    async create(payload) {
        try {
            const newData = await this.workIndustryService.createWorkIndustry(payload);
            return {
                success: true,
                message: "New Record Added Successfully",
                data: newData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Adding New Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll(page = 1, limit = 1000, search) {
        try {
            const allData = await this.workIndustryService.getAllWorkIndustryData({
                page,
                limit,
            }, search);
            return {
                success: true,
                message: "Record Fetched Successfully",
                data: allData.data,
                count: allData.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const data = await this.workIndustryService.getWorkIndustryById(id);
            return {
                success: true,
                message: "Record Fetched Successfully",
                data: data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(payload, id) {
        try {
            const updatedData = await this.workIndustryService.updateWorkIndustry(payload, id);
            return {
                success: true,
                message: "Record Updated Successfully",
                data: updatedData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Updating Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(payload) {
        try {
            const deletedData = await this.workIndustryService.deleteWorkIndustry(payload.ids);
            return {
                success: true,
                message: "Record Deleted Successfully",
                data: deletedData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Deleting Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WorkIndustryController = WorkIndustryController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: workIndustry_dto_1.WorkIndustryDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workIndustry_dto_1.WorkIndustryDTO]),
    __metadata("design:returntype", Promise)
], WorkIndustryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], WorkIndustryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkIndustryController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: workIndustry_dto_1.WorkIndustryDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workIndustry_dto_1.WorkIndustryDTO, Number]),
    __metadata("design:returntype", Promise)
], WorkIndustryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiBody)({ type: deleteWorkIndustry_dto_1.DeleteWorkIndustryDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteWorkIndustry_dto_1.DeleteWorkIndustryDTO]),
    __metadata("design:returntype", Promise)
], WorkIndustryController.prototype, "delete", null);
exports.WorkIndustryController = WorkIndustryController = __decorate([
    (0, swagger_1.ApiTags)("Work Industry"),
    (0, common_1.Controller)("work-industry"),
    __metadata("design:paramtypes", [workIndustry_service_1.WorkIndustryService])
], WorkIndustryController);
//# sourceMappingURL=workIndustry.controller.js.map