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
exports.PlanCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const planCategory_dto_1 = require("./entity/planCategory.dto");
const planCategory_service_1 = require("./planCategory.service");
let PlanCategoryController = class PlanCategoryController {
    constructor(planCategoryService) {
        this.planCategoryService = planCategoryService;
    }
    async create(payload) {
        try {
            const data = await this.planCategoryService.create(payload);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                success: true,
                message: "Plan category created successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while creating plan category",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll() {
        try {
            const data = await this.planCategoryService.getAll();
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan categories fetched successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching plan categories",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const data = await this.planCategoryService.getById(id);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan category fetched successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching plan category",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const data = await this.planCategoryService.update(id, payload);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan category updated successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating plan category",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const data = await this.planCategoryService.delete(id);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan category deleted successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting plan category",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PlanCategoryController = PlanCategoryController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: planCategory_dto_1.PlanCategoryDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [planCategory_dto_1.PlanCategoryDTO]),
    __metadata("design:returntype", Promise)
], PlanCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("get-all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanCategoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanCategoryController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: planCategory_dto_1.PlanCategoryDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, planCategory_dto_1.PlanCategoryDTO]),
    __metadata("design:returntype", Promise)
], PlanCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanCategoryController.prototype, "delete", null);
exports.PlanCategoryController = PlanCategoryController = __decorate([
    (0, swagger_1.ApiTags)("Plan Category"),
    (0, common_1.Controller)("plancategory"),
    __metadata("design:paramtypes", [planCategory_service_1.PlanCategoryService])
], PlanCategoryController);
//# sourceMappingURL=planCategory.controller.js.map