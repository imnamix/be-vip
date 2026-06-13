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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entity/project.entity");
const typeorm_2 = require("typeorm");
let ProjectService = class ProjectService {
    constructor(projectRepo) {
        this.projectRepo = projectRepo;
    }
    async createProject(projectObj) {
        try {
            if (projectObj.type === "BANNER") {
                projectObj = {
                    ...projectObj,
                    name: projectObj.name || "",
                    reraId: projectObj.reraId || "",
                    headline: projectObj.headline || "",
                    subHeadline: projectObj.subHeadline || "",
                    tagline: projectObj.tagline || "",
                    projectOverviewSection: projectObj.projectOverviewSection || [],
                    locationAdvantage: projectObj.locationAdvantage || [],
                    projectWalkthrough: projectObj.projectWalkthrough || [],
                    availableOptions: projectObj.availableOptions || [],
                    projectSpecification: projectObj.projectSpecification || [],
                    amenities: projectObj.amenities || [],
                    gallery: projectObj.gallery || [],
                    masterPlan: projectObj.masterPlan || [],
                    floorPlan: projectObj.floorPlan || [],
                    location: projectObj.location || "",
                };
            }
            const newProject = this.projectRepo.create(projectObj);
            return await this.projectRepo.save(newProject);
        }
        catch (error) {
            return error;
        }
    }
    async getAllProjects(pagination) {
        try {
            const { page, limit, search } = pagination;
            let pageSize = 1000000;
            let skip = 0;
            if (page) {
                if (limit && limit > 0) {
                    pageSize = limit;
                    skip = limit * (page - 1);
                }
            }
            const [projects, total] = await this.projectRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
                where: search ? [{ name: (0, typeorm_2.Like)(`%${search}%`) }] : null,
            });
            return {
                count: total,
                data: projects,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getProjectById(id) {
        try {
            const project = await this.projectRepo.findOne({ where: { id } });
            if (!project) {
                throw new common_1.HttpException("project not found", common_1.HttpStatus.NOT_FOUND);
            }
            return project;
        }
        catch (error) {
            return error;
        }
    }
    async updateProject(id, updatedData) {
        try {
            const project = await this.projectRepo.findOne({ where: { id } });
            if (updatedData.type === "BANNER") {
                updatedData = {
                    ...updatedData,
                    name: updatedData.name || "",
                    reraId: updatedData.reraId || "",
                    headline: updatedData.headline || "",
                    subHeadline: updatedData.subHeadline || "",
                    tagline: updatedData.tagline || "",
                    projectOverviewSection: updatedData.projectOverviewSection || [],
                    locationAdvantage: updatedData.locationAdvantage || [],
                    projectWalkthrough: updatedData.projectWalkthrough || [],
                    availableOptions: updatedData.availableOptions || [],
                    projectSpecification: updatedData.projectSpecification || [],
                    amenities: updatedData.amenities || [],
                    gallery: updatedData.gallery || [],
                    masterPlan: updatedData.masterPlan || [],
                    floorPlan: updatedData.floorPlan || [],
                    location: updatedData.location || "",
                };
            }
            this.projectRepo.merge(project, updatedData);
            return await this.projectRepo.save(project);
        }
        catch (error) {
            return error;
        }
    }
    async deleteProject(id) {
        try {
            const deletedProject = await this.projectRepo.findBy({ id: (0, typeorm_2.In)(id) });
            if (deletedProject.length == 0) {
                throw new common_1.HttpException("Project not found", common_1.HttpStatus.NOT_FOUND);
            }
            await this.projectRepo.delete(id);
            return deletedProject;
        }
        catch (error) {
            return error;
        }
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.EN_Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map