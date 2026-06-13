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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plan_entity_1 = require("./entity/plan.entity");
const typeorm_2 = require("typeorm");
let PlanService = class PlanService {
    constructor(planRepo) {
        this.planRepo = planRepo;
    }
    async create(obj) {
        try {
            const newData = this.planRepo.create(obj);
            const savedData = await this.planRepo.save(newData);
            return {
                success: true,
                message: "Plan created successfully",
                data: savedData,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while creating plan",
                error: error,
            };
        }
    }
    async getAll() {
        try {
            const data = await this.planRepo.find({
                where: { status: 1 },
                order: { name: "ASC" },
                relations: ["plan_category"],
            });
            return {
                success: true,
                message: "Plans fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching plans",
                error: error,
            };
        }
    }
    async getById(id) {
        try {
            const data = await this.planRepo.findOne({
                where: { id },
                relations: ["plan_category"],
            });
            if (!data) {
                return {
                    success: false,
                    message: "Plan not found",
                    data: null,
                };
            }
            return {
                success: true,
                message: "Plan fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching plan",
                error: error,
            };
        }
    }
    async update(id, obj) {
        try {
            let plan = await this.planRepo.findOne({
                where: { id },
            });
            if (!plan) {
                return {
                    success: false,
                    message: "Plan not found",
                    data: null,
                };
            }
            Object.assign(plan, obj);
            const updatedData = await this.planRepo.save(plan);
            return {
                success: true,
                message: "Plan updated successfully",
                data: updatedData,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while updating plan",
                error: error,
            };
        }
    }
    async delete(id) {
        try {
            const plan = await this.planRepo.findOne({
                where: { id },
            });
            if (!plan) {
                return {
                    success: false,
                    message: "Plan not found",
                    data: null,
                };
            }
            await this.planRepo.remove(plan);
            return {
                success: true,
                message: "Plan deleted successfully",
                data: null,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while deleting plan",
                error: error,
            };
        }
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plan_entity_1.EN_Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanService);
//# sourceMappingURL=plan.service.js.map