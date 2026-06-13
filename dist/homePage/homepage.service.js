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
exports.HomePageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const homepage_entity_1 = require("./entity/homepage.entity");
const typeorm_2 = require("typeorm");
let HomePageService = class HomePageService {
    constructor(homePageRepo) {
        this.homePageRepo = homePageRepo;
    }
    async createHomePage(payload) {
        try {
            const newHomePageData = this.homePageRepo.create(payload);
            return await this.homePageRepo.save(newHomePageData);
        }
        catch (error) {
            return error;
        }
    }
    async getAllHomePageData(pagination) {
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
            const [data, total] = await this.homePageRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
            });
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getHomeById(id) {
        try {
            const homeData = await this.homePageRepo.findOne({ where: { id } });
            if (!homeData) {
                return {
                    success: false,
                    message: `Failed to get home data, ID ${id} not found`,
                };
            }
            return {
                success: true,
                message: "Data Fetch Successfully",
                data: homeData,
            };
        }
        catch (error) {
            return error;
        }
    }
    async updateHomePage(id, payload) {
        try {
            const homePageData = await this.homePageRepo.findOne({ where: { id } });
            if (!homePageData) {
                return {
                    success: false,
                    message: `Failed to update, ID ${id} not found`,
                };
            }
            this.homePageRepo.merge(homePageData, payload);
            const updatedData = await this.homePageRepo.save(homePageData);
            return {
                success: true,
                message: "Record Updated Successfully",
                data: updatedData,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteHomePage(id) {
        try {
            const existingData = await this.homePageRepo.findBy({ id: (0, typeorm_2.In)(id) });
            if (existingData.length === 0) {
                return {
                    success: false,
                    message: `Failed to delete, ID ${id} not found`,
                };
            }
            await this.homePageRepo.delete(id);
            return {
                success: true,
                message: "Record Deleted Successfully",
                data: existingData,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.HomePageService = HomePageService;
exports.HomePageService = HomePageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(homepage_entity_1.EN_HomePage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HomePageService);
//# sourceMappingURL=homepage.service.js.map