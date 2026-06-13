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
exports.ProjectLocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const deleteLoc_dto_1 = require("./entity/deleteLoc.dto");
const projectLocation_service_1 = require("./projectLocation.service");
const projectLocation_dto_1 = require("./entity/projectLocation.dto");
let ProjectLocationController = class ProjectLocationController {
    constructor(ProjectLocationService) {
        this.ProjectLocationService = ProjectLocationService;
    }
    async createProjectLocation(obj) {
        try {
            const newLocation = await this.ProjectLocationService.create(obj);
            return {
                success: newLocation.success,
                message: newLocation.message,
                data: newLocation.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while adding new project location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllProjectLocation(page = 1, limit = 1000, search) {
        try {
            const allLocations = await this.ProjectLocationService.getAllProjectLocations({
                page,
                limit,
                search,
            });
            return {
                success: true,
                message: "Project Location Fetched Successfully.",
                data: allLocations.data,
                count: allLocations.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching all project location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProjectById(id) {
        try {
            const projectLocation = await this.ProjectLocationService.getProjectLocById(id);
            if (!projectLocation) {
                return {
                    success: false,
                    message: "error while fetching project location",
                };
            }
            return {
                success: true,
                message: `Project Location with ID ${id} Fetch Successfully`,
                data: projectLocation,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching project location by ID",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateProjectLocation(id, obj) {
        try {
            const updatedLocation = await this.ProjectLocationService.updateProjectLocation(id, obj);
            return {
                success: updatedLocation.success,
                message: updatedLocation.message,
                data: updatedLocation.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating project location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteProjectLoc(deleteDTo) {
        try {
            const project = await this.ProjectLocationService.deleteProjectLocation(deleteDTo.ids);
            return {
                success: project.success,
                message: project.message,
                data: project.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting project location",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProjectLocationController = ProjectLocationController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: projectLocation_dto_1.ProjectLocationDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projectLocation_dto_1.ProjectLocationDTO]),
    __metadata("design:returntype", Promise)
], ProjectLocationController.prototype, "createProjectLocation", null);
__decorate([
    (0, common_1.Get)("getAllProjectLocation"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProjectLocationController.prototype, "getAllProjectLocation", null);
__decorate([
    (0, common_1.Get)("getProjectLocationById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectLocationController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Put)("updateProjectLocation/:id"),
    (0, swagger_1.ApiBody)({ type: projectLocation_dto_1.ProjectLocationDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, projectLocation_dto_1.ProjectLocationDTO]),
    __metadata("design:returntype", Promise)
], ProjectLocationController.prototype, "updateProjectLocation", null);
__decorate([
    (0, common_1.Delete)("deleteProjectLocation"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteLoc_dto_1.DeleteLocDTO]),
    __metadata("design:returntype", Promise)
], ProjectLocationController.prototype, "deleteProjectLoc", null);
exports.ProjectLocationController = ProjectLocationController = __decorate([
    (0, swagger_1.ApiTags)("Project Location"),
    (0, common_1.Controller)("projectLocation"),
    __metadata("design:paramtypes", [projectLocation_service_1.ProjectLocationService])
], ProjectLocationController);
//# sourceMappingURL=projectLocation.controller.js.map