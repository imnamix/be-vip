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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const services_entity_1 = require("./entity/services.entity");
const typeorm_2 = require("typeorm");
let ServicesService = class ServicesService {
    constructor(servicesRepo) {
        this.servicesRepo = servicesRepo;
    }
    async create(obj) {
        try {
            const newData = this.servicesRepo.create(obj);
            return await this.servicesRepo.save(newData);
        }
        catch (error) {
            return error;
        }
    }
    async getAll(skip = 0, take = 5, searchKey = "") {
        try {
            let query = this.servicesRepo
                .createQueryBuilder("service")
                .where("service.status = :status", { status: 1 });
            if (searchKey && searchKey.trim()) {
                query = query.andWhere("(service.title LIKE :searchKey OR service.description LIKE :searchKey OR service.bannerTitle LIKE :searchKey)", { searchKey: `%${searchKey}%` });
            }
            const [data, total] = await query
                .orderBy("service.created_at", "DESC")
                .skip(skip)
                .take(take)
                .getManyAndCount();
            return {
                success: true,
                message: "Services fetched successfully",
                data: data,
                total: total,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching services",
                error: error,
            };
        }
    }
    async getById(id) {
        try {
            const data = await this.servicesRepo.findOne({
                where: { id, status: 1 },
            });
            if (!data) {
                return {
                    success: false,
                    message: `Service with id ${id} not found`,
                    data: null,
                };
            }
            return {
                success: true,
                message: "Service fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching service",
                error: error,
            };
        }
    }
    async update(id, obj) {
        try {
            let service = await this.servicesRepo.findOne({
                where: { id },
            });
            if (!service) {
                return {
                    success: false,
                    message: `Service with id ${id} not found`,
                };
            }
            Object.assign(service, obj);
            const updatedData = await this.servicesRepo.save(service);
            return {
                success: true,
                message: "Service updated successfully",
                data: updatedData,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while updating service",
                error: error,
            };
        }
    }
    async delete(id) {
        try {
            const service = await this.servicesRepo.findOne({
                where: { id },
            });
            if (!service) {
                return {
                    success: false,
                    message: `Service with id ${id} not found`,
                };
            }
            await this.servicesRepo.remove(service);
            return {
                success: true,
                message: "Service deleted successfully",
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while deleting service",
                error: error,
            };
        }
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(services_entity_1.EN_Services)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesService);
//# sourceMappingURL=services.service.js.map