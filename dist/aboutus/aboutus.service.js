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
exports.AboutUsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aboutus_entity_1 = require("./entity/aboutus.entity");
const typeorm_2 = require("typeorm");
let AboutUsService = class AboutUsService {
    constructor(aboutusRepo) {
        this.aboutusRepo = aboutusRepo;
    }
    async create(obj) {
        try {
            const newData = this.aboutusRepo.create(obj);
            return await this.aboutusRepo.save(newData);
        }
        catch (error) {
            return error;
        }
    }
    async getAboutusData(pagination) {
        try {
            const { page, limit, search, status } = pagination;
            let pageSize = 1000000;
            let skip = 0;
            if (page) {
                if (limit && limit > 0) {
                    pageSize = limit;
                    skip = limit * (page - 1);
                }
            }
            let whereCondition = null;
            if (status === "active") {
                whereCondition = search
                    ? [{ businessName: (0, typeorm_2.Like)(`%${search}%`), status: 1 }]
                    : { status: 1 };
            }
            else {
                whereCondition = search
                    ? [{ businessName: (0, typeorm_2.Like)(`%${search}%`) }]
                    : null;
            }
            const [data, total] = await this.aboutusRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
                where: whereCondition,
            });
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getAboutUsById(id) {
        try {
            const aboutUsData = await this.aboutusRepo.findOne({ where: { id } });
            if (!aboutUsData) {
                return {
                    success: false,
                    message: `Failed to get about us data, id ${id} not found`,
                };
            }
            return {
                success: true,
                message: "Data Fetch Successfully",
                data: aboutUsData,
            };
        }
        catch (error) {
            return error;
        }
    }
    async updateAboutusData(id, obj) {
        try {
            const updateAboutus = await this.aboutusRepo.findOne({
                where: { id },
            });
            if (!updateAboutus) {
                return {
                    success: false,
                    message: `ID ${id} Not Found`,
                };
            }
            this.aboutusRepo.merge(updateAboutus, obj);
            await this.aboutusRepo.save(updateAboutus);
            return {
                success: true,
                message: "Information Updated Successfully.",
                data: updateAboutus,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteAboutus(id) {
        try {
            const deletedData = await this.aboutusRepo.findBy({
                id: (0, typeorm_2.In)(id),
            });
            if (deletedData.length === 0) {
                return {
                    success: false,
                    message: `Error While Deleting With ID ${id} Not Found`,
                };
            }
            await this.aboutusRepo.delete(id);
            return {
                success: true,
                message: "Information Deleted Successfully.",
                data: deletedData,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.AboutUsService = AboutUsService;
exports.AboutUsService = AboutUsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aboutus_entity_1.EN_AboutUs)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AboutUsService);
//# sourceMappingURL=aboutus.service.js.map