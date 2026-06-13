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
exports.NewsBlogsController = void 0;
const common_1 = require("@nestjs/common");
const newsBlogs_service_1 = require("./newsBlogs.service");
const swagger_1 = require("@nestjs/swagger");
const newsBlogs_dto_1 = require("./entity/newsBlogs.dto");
const deleteNews_dto_1 = require("./entity/deleteNews.dto");
let NewsBlogsController = class NewsBlogsController {
    constructor(newsBlogsService) {
        this.newsBlogsService = newsBlogsService;
    }
    async create(obj) {
        try {
            const newNewsBlog = await this.newsBlogsService.createNewsBlog(obj);
            return {
                success: true,
                message: "News/Blog Added Successfully.",
                data: newNewsBlog,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Adding New Blog/News",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll(page = 1, limit = 1000, search) {
        try {
            const allData = await this.newsBlogsService.getAllNewsBlogs({
                page,
                limit,
                search,
            });
            return {
                success: true,
                message: "News/Blogs Details Fetched Successfully.",
                data: allData.data,
                count: allData.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching News/Blogs",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const data = await this.newsBlogsService.getAllNewsBlogsById(id);
            return {
                success: data.success,
                message: data.message,
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateNewsBlog(id, data) {
        try {
            const updatedData = await this.newsBlogsService.updateNewsBlog(id, data);
            return {
                success: updatedData.success,
                message: updatedData.message,
                data: updatedData.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Updating News/Blog",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteNewsBlog(id) {
        try {
            const deletedNewsBlog = await this.newsBlogsService.deleteNewsBlogs(id.ids);
            return {
                success: deletedNewsBlog.success,
                message: deletedNewsBlog.message,
                data: deletedNewsBlog.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Deleting",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.NewsBlogsController = NewsBlogsController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: newsBlogs_dto_1.NewsBlogsDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsBlogs_dto_1.NewsBlogsDTO]),
    __metadata("design:returntype", Promise)
], NewsBlogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAllNewsBlog"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], NewsBlogsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NewsBlogsController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({ type: newsBlogs_dto_1.NewsBlogsDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, newsBlogs_dto_1.NewsBlogsDTO]),
    __metadata("design:returntype", Promise)
], NewsBlogsController.prototype, "updateNewsBlog", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiBody)({ type: deleteNews_dto_1.DeleteNewsDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteNews_dto_1.DeleteNewsDTO]),
    __metadata("design:returntype", Promise)
], NewsBlogsController.prototype, "deleteNewsBlog", null);
exports.NewsBlogsController = NewsBlogsController = __decorate([
    (0, swagger_1.ApiTags)("News And Blogs"),
    (0, common_1.Controller)("newsBlogs"),
    __metadata("design:paramtypes", [newsBlogs_service_1.NewsBlogsService])
], NewsBlogsController);
//# sourceMappingURL=newsBlogs.controller.js.map