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
exports.PlanCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const planCategory_entity_1 = require("./entity/planCategory.entity");
const typeorm_2 = require("typeorm");
let PlanCategoryService = class PlanCategoryService {
    constructor(planCategoryRepo) {
        this.planCategoryRepo = planCategoryRepo;
    }
    async create(obj) {
        try {
            const newData = this.planCategoryRepo.create(obj);
            const savedData = await this.planCategoryRepo.save(newData);
            return {
                success: true,
                message: "Plan category created successfully",
                data: savedData,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while creating plan category",
                error: error,
            };
        }
    }
    async getAll() {
        try {
            const data = await this.planCategoryRepo.find({
                order: { name: "ASC" },
            });
            return {
                success: true,
                message: "Plan categories fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching plan categories",
                error: error,
            };
        }
    }
    async getById(id) {
        try {
            const data = await this.planCategoryRepo.findOne({
                where: { id },
            });
            if (!data) {
                return {
                    success: false,
                    message: "Plan category not found",
                    data: null,
                };
            }
            return {
                success: true,
                message: "Plan category fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching plan category",
                error: error,
            };
        }
    }
    async update(id, obj) {
        try {
            let planCategory = await this.planCategoryRepo.findOne({
                where: { id },
            });
            if (!planCategory) {
                return {
                    success: false,
                    message: "Plan category not found",
                    data: null,
                };
            }
            Object.assign(planCategory, obj);
            const updatedData = await this.planCategoryRepo.save(planCategory);
            return {
                success: true,
                message: "Plan category updated successfully",
                data: updatedData,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while updating plan category",
                error: error,
            };
        }
    }
    async delete(id) {
        try {
            const planCategory = await this.planCategoryRepo.findOne({
                where: { id },
            });
            if (!planCategory) {
                return {
                    success: false,
                    message: "Plan category not found",
                    data: null,
                };
            }
            await this.planCategoryRepo.remove(planCategory);
            return {
                success: true,
                message: "Plan category deleted successfully",
                data: null,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while deleting plan category",
                error: error,
            };
        }
    }
};
exports.PlanCategoryService = PlanCategoryService;
exports.PlanCategoryService = PlanCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(planCategory_entity_1.EN_PlanCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanCategoryService);
//# sourceMappingURL=planCategory.service.js.map