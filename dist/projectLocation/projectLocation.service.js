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
exports.ProjectLocationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const projectLocation_entity_1 = require("./entity/projectLocation.entity");
let ProjectLocationService = class ProjectLocationService {
    constructor(projectLocationRepo) {
        this.projectLocationRepo = projectLocationRepo;
    }
    async create(obj) {
        try {
            const newLocation = this.projectLocationRepo.create(obj);
            const data = await this.projectLocationRepo.save(newLocation);
            return {
                success: true,
                message: "Project Details Added Successfully.",
                data: data,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getAllProjectLocations(pagination) {
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
            const [data, total] = await this.projectLocationRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
                where: search ? [{ projectName: (0, typeorm_2.Like)(`%${search}%`) }] : null,
            });
            return {
                count: total,
                data: data,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getProjectLocById(id) {
        try {
            const projectLocation = await this.projectLocationRepo.findOne({
                where: { id },
            });
            return projectLocation;
        }
        catch (error) {
            return error;
        }
    }
    async updateProjectLocation(id, obj) {
        try {
            const updateLocation = await this.projectLocationRepo.findOne({
                where: { id },
            });
            if (!updateLocation) {
                return {
                    success: false,
                    message: `Project Details with ID ${id} not found`,
                };
            }
            this.projectLocationRepo.merge(updateLocation, obj);
            await this.projectLocationRepo.save(updateLocation);
            return {
                success: true,
                message: "Project Details Updated Successfully.",
                data: updateLocation,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteProjectLocation(id) {
        try {
            const deletedLocation = await this.projectLocationRepo.findBy({
                id: (0, typeorm_2.In)(id),
            });
            if (deletedLocation.length === 0) {
                return {
                    success: false,
                    message: `Project Details with ID ${id} not found`,
                };
            }
            await this.projectLocationRepo.delete(id);
            return {
                success: true,
                message: "Project Details Deleted Successfully.",
                data: deletedLocation,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.ProjectLocationService = ProjectLocationService;
exports.ProjectLocationService = ProjectLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(projectLocation_entity_1.EN_ProjectLocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectLocationService);
//# sourceMappingURL=projectLocation.service.js.map