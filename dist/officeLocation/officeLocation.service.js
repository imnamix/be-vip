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
exports.OfficeLocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const officeLocation_entity_1 = require("./entity/officeLocation.entity");
const typeorm_2 = require("typeorm");
let OfficeLocationService = class OfficeLocationService {
    constructor(plantLocationRepo) {
        this.plantLocationRepo = plantLocationRepo;
    }
    async create(obj) {
        try {
            const newOfficeLoc = this.plantLocationRepo.create(obj);
            return await this.plantLocationRepo.save(newOfficeLoc);
        }
        catch (error) {
            return error;
        }
    }
    async getAllOfficeLoc(pagination) {
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
            const [data, total] = await this.plantLocationRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
                where: search ? [{ officeNumber: (0, typeorm_2.Like)(`%${search}%`) }] : null,
            });
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getLocById(id) {
        try {
            const officeLocation = await this.plantLocationRepo.findOne({
                where: { id },
            });
            if (!officeLocation) {
                return {
                    success: false,
                    message: `Office location with ID ${id} not found`,
                };
            }
            return {
                success: true,
                message: "Successfully fetch office location",
                data: officeLocation,
            };
        }
        catch (error) {
            return error;
        }
    }
    async updateOfficeLocation(id, payload) {
        try {
            const officeLocation = await this.plantLocationRepo.findOne({
                where: { id },
            });
            if (!officeLocation) {
                return {
                    success: false,
                    message: `Office location with ID ${id} not found`,
                };
            }
            this.plantLocationRepo.merge(officeLocation, payload);
            const updatedLocation = await this.plantLocationRepo.save(officeLocation);
            return {
                success: true,
                message: "Office Location Updated Successfully.",
                data: updatedLocation,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteOffceLoc(id) {
        try {
            const officeLocation = await this.plantLocationRepo.findBy({
                id: (0, typeorm_2.In)(id),
            });
            if (officeLocation.length === 0) {
                return {
                    success: false,
                    message: `Office location with ID ${id} not found`,
                };
            }
            this.plantLocationRepo.delete(id);
            return {
                success: true,
                message: "Office Location Deleted Successfully.",
                data: officeLocation,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.OfficeLocationService = OfficeLocationService;
exports.OfficeLocationService = OfficeLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(officeLocation_entity_1.EN_OfficeLocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OfficeLocationService);
//# sourceMappingURL=officeLocation.service.js.map