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
exports.FundedProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fundedProjects_entity_1 = require("./entity/fundedProjects.entity");
const typeorm_2 = require("typeorm");
let FundedProjectsService = class FundedProjectsService {
    constructor(fundedProjectsRepo) {
        this.fundedProjectsRepo = fundedProjectsRepo;
    }
    async createFundedProject(payload) {
        try {
            const newFundedProject = this.fundedProjectsRepo.create(payload);
            return await this.fundedProjectsRepo.save(newFundedProject);
        }
        catch (error) {
            return error;
        }
    }
    async getAllFundedProjectsData(pagination, search) {
        try {
            const { page, limit } = pagination;
            let pageSize = 1000000;
            let skip = 0;
            if (page && limit && limit > 0) {
                pageSize = limit;
                skip = pageSize * (page - 1);
            }
            let query = this.fundedProjectsRepo.createQueryBuilder("funded_projects");
            if (search) {
                query = query.where("funded_projects.title LIKE :search OR funded_projects.description LIKE :search", { search: `%${search}%` });
            }
            const [data, total] = await query
                .orderBy("funded_projects.created_at", "DESC")
                .take(pageSize)
                .skip(skip)
                .getManyAndCount();
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getFundedProjectById(id) {
        try {
            return await this.fundedProjectsRepo.findOne({ where: { id } });
        }
        catch (error) {
            return error;
        }
    }
    async updateFundedProject(payload, id) {
        try {
            return await this.fundedProjectsRepo.update({ id }, payload);
        }
        catch (error) {
            return error;
        }
    }
    async deleteFundedProject(ids) {
        try {
            return await this.fundedProjectsRepo.delete({ id: (0, typeorm_2.In)(ids) });
        }
        catch (error) {
            return error;
        }
    }
};
exports.FundedProjectsService = FundedProjectsService;
exports.FundedProjectsService = FundedProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fundedProjects_entity_1.EN_FundedProject)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FundedProjectsService);
//# sourceMappingURL=fundedProjects.service.js.map