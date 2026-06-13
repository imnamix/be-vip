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
exports.WorkIndustryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workIndustry_entity_1 = require("./entity/workIndustry.entity");
const typeorm_2 = require("typeorm");
let WorkIndustryService = class WorkIndustryService {
    constructor(workIndustryRepo) {
        this.workIndustryRepo = workIndustryRepo;
    }
    async createWorkIndustry(payload) {
        try {
            const newWorkIndustry = this.workIndustryRepo.create(payload);
            return await this.workIndustryRepo.save(newWorkIndustry);
        }
        catch (error) {
            return error;
        }
    }
    async getAllWorkIndustryData(pagination, search) {
        try {
            const { page, limit } = pagination;
            let pageSize = 1000000;
            let skip = 0;
            if (page) {
                if (limit && limit > 0) {
                    pageSize = limit;
                    skip = limit * (page - 1);
                }
            }
            let query = this.workIndustryRepo.createQueryBuilder("work_industry");
            if (search) {
                query = query.where("work_industry.title LIKE :search OR work_industry.description LIKE :search", { search: `%${search}%` });
            }
            const [data, total] = await query
                .orderBy("work_industry.created_at", "DESC")
                .take(pageSize)
                .skip(skip)
                .getManyAndCount();
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getWorkIndustryById(id) {
        try {
            const data = await this.workIndustryRepo.findOne({
                where: { id: id },
            });
            return data;
        }
        catch (error) {
            return error;
        }
    }
    async updateWorkIndustry(payload, id) {
        try {
            const updatedWorkIndustry = await this.workIndustryRepo.update({ id: id }, payload);
            return updatedWorkIndustry;
        }
        catch (error) {
            return error;
        }
    }
    async deleteWorkIndustry(ids) {
        try {
            const deletedWorkIndustry = await this.workIndustryRepo.delete({
                id: (0, typeorm_2.In)(ids),
            });
            return deletedWorkIndustry;
        }
        catch (error) {
            return error;
        }
    }
};
exports.WorkIndustryService = WorkIndustryService;
exports.WorkIndustryService = WorkIndustryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workIndustry_entity_1.EN_WorkIndustry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorkIndustryService);
//# sourceMappingURL=workIndustry.service.js.map