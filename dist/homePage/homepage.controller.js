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
exports.HomePageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const homepage_dto_1 = require("./entity/homepage.dto");
const homepage_service_1 = require("./homepage.service");
const deleteHome_dto_1 = require("./entity/deleteHome.dto");
let HomePageController = class HomePageController {
    constructor(homePageService) {
        this.homePageService = homePageService;
    }
    async create(payload) {
        try {
            const newData = await this.homePageService.createHomePage(payload);
            return {
                success: true,
                message: "New Record Added Successfully",
                data: newData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Adding New Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll(page = 1, limit = 1000) {
        try {
            const allData = await this.homePageService.getAllHomePageData({
                page,
                limit,
            });
            return {
                success: true,
                message: "Record Fetched Successfully",
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
            const homeData = await this.homePageService.getHomeById(id);
            return homeData;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateData(payload, id) {
        try {
            const updatedData = await this.homePageService.updateHomePage(id, payload);
            return {
                success: updatedData.success,
                message: updatedData.message,
                data: updatedData.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Updating Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteHomeData(id) {
        try {
            const deletedData = await this.homePageService.deleteHomePage(id.ids);
            return {
                success: deletedData.success,
                message: deletedData.message,
                data: deletedData.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Deleting Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.HomePageController = HomePageController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: homepage_dto_1.HomePageDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [homepage_dto_1.HomePageDTO]),
    __metadata("design:returntype", Promise)
], HomePageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], HomePageController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HomePageController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: homepage_dto_1.HomePageDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [homepage_dto_1.HomePageDTO, Number]),
    __metadata("design:returntype", Promise)
], HomePageController.prototype, "updateData", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiBody)({ type: deleteHome_dto_1.DeleteHomeDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteHome_dto_1.DeleteHomeDTO]),
    __metadata("design:returntype", Promise)
], HomePageController.prototype, "deleteHomeData", null);
exports.HomePageController = HomePageController = __decorate([
    (0, swagger_1.ApiTags)("Home Page"),
    (0, common_1.Controller)("homePage"),
    __metadata("design:paramtypes", [homepage_service_1.HomePageService])
], HomePageController);
//# sourceMappingURL=homepage.controller.js.map