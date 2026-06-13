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
exports.AboutusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aboutus_dto_1 = require("./entity/aboutus.dto");
const aboutus_service_1 = require("./aboutus.service");
const deleteAbout_dto_1 = require("./entity/deleteAbout.dto");
let AboutusController = class AboutusController {
    constructor(aboutusService) {
        this.aboutusService = aboutusService;
    }
    async create(payload) {
        try {
            const newData = await this.aboutusService.create(payload);
            return {
                success: true,
                message: "Information Added Successfully.",
                data: newData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while adding new about us data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllData(page = 1, limit = 1000, search, status) {
        try {
            const allData = await this.aboutusService.getAboutusData({
                page,
                limit,
                search,
                status,
            });
            return {
                success: true,
                message: "Information Fetched Successfully.",
                data: allData.data,
                count: allData.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const aboutUsData = await this.aboutusService.getAboutUsById(id);
            return aboutUsData;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAboutUs(id, payload) {
        try {
            const updatedData = await this.aboutusService.updateAboutusData(id, payload);
            return {
                success: updatedData.success,
                message: updatedData.message,
                data: updatedData.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Updating",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePlantLoc(id) {
        try {
            const data = await this.aboutusService.deleteAboutus(id.ids);
            return {
                success: data.success,
                message: data.message,
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting about us data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AboutusController = AboutusController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: aboutus_dto_1.AboutusDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aboutus_dto_1.AboutusDTO]),
    __metadata("design:returntype", Promise)
], AboutusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __param(3, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AboutusController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AboutusController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("updateAboutUs/:id"),
    (0, swagger_1.ApiBody)({ type: aboutus_dto_1.AboutusDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, aboutus_dto_1.AboutusDTO]),
    __metadata("design:returntype", Promise)
], AboutusController.prototype, "updateAboutUs", null);
__decorate([
    (0, common_1.Delete)("deleteAboutus"),
    (0, swagger_1.ApiBody)({ type: deleteAbout_dto_1.DeleteAboutDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteAbout_dto_1.DeleteAboutDTO]),
    __metadata("design:returntype", Promise)
], AboutusController.prototype, "deletePlantLoc", null);
exports.AboutusController = AboutusController = __decorate([
    (0, swagger_1.ApiTags)("About Us"),
    (0, common_1.Controller)("aboutus"),
    __metadata("design:paramtypes", [aboutus_service_1.AboutUsService])
], AboutusController);
//# sourceMappingURL=aboutus.controller.js.map