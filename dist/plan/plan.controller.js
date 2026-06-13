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
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plan_dto_1 = require("./entity/plan.dto");
const plan_service_1 = require("./plan.service");
let PlanController = class PlanController {
    constructor(planService) {
        this.planService = planService;
    }
    async create(payload) {
        try {
            const data = await this.planService.create(payload);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                success: true,
                message: "Plan created successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while creating plan",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll() {
        try {
            const data = await this.planService.getAll();
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plans fetched successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching plans",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const data = await this.planService.getById(id);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan fetched successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching plan",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const data = await this.planService.update(id, payload);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan updated successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating plan",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const data = await this.planService.delete(id);
            if (!data.success) {
                throw new common_1.HttpException({
                    success: false,
                    message: data.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Plan deleted successfully.",
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting plan",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: plan_dto_1.PlanDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.PlanDTO]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("get-all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: plan_dto_1.PlanDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, plan_dto_1.PlanDTO]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "delete", null);
exports.PlanController = PlanController = __decorate([
    (0, swagger_1.ApiTags)("Plan"),
    (0, common_1.Controller)("plan"),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map