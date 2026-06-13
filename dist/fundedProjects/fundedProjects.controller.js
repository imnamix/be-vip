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
exports.FundedProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fundedProjects_dto_1 = require("./entity/fundedProjects.dto");
const fundedProjects_service_1 = require("./fundedProjects.service");
let FundedProjectsController = class FundedProjectsController {
    constructor(fundedProjectsService) {
        this.fundedProjectsService = fundedProjectsService;
    }
    async create(payload) {
        try {
            const newData = await this.fundedProjectsService.createFundedProject(payload);
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
            const allData = await this.fundedProjectsService.getAllFundedProjectsData({ page, limit }, search);
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
            const data = await this.fundedProjectsService.getFundedProjectById(id);
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
    async update(id, payload) {
        try {
            const updatedData = await this.fundedProjectsService.updateFundedProject(payload, id);
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
    async delete(deleteDTO) {
        try {
            const deletedData = await this.fundedProjectsService.deleteFundedProject(deleteDTO.ids);
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
exports.FundedProjectsController = FundedProjectsController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: fundedProjects_dto_1.FundedProjectsDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fundedProjects_dto_1.FundedProjectsDTO]),
    __metadata("design:returntype", Promise)
], FundedProjectsController.prototype, "create", null);
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
], FundedProjectsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FundedProjectsController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: fundedProjects_dto_1.FundedProjectsDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, fundedProjects_dto_1.FundedProjectsDTO]),
    __metadata("design:returntype", Promise)
], FundedProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiBody)({ type: fundedProjects_dto_1.DeleteFundedProjectsDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fundedProjects_dto_1.DeleteFundedProjectsDTO]),
    __metadata("design:returntype", Promise)
], FundedProjectsController.prototype, "delete", null);
exports.FundedProjectsController = FundedProjectsController = __decorate([
    (0, swagger_1.ApiTags)("Funded Projects"),
    (0, common_1.Controller)("funded-projects"),
    __metadata("design:paramtypes", [fundedProjects_service_1.FundedProjectsService])
], FundedProjectsController);
//# sourceMappingURL=fundedProjects.controller.js.map