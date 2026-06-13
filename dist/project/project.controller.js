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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_dto_1 = require("./entity/project.dto");
const swagger_1 = require("@nestjs/swagger");
const deleteProject_dto_1 = require("./entity/deleteProject.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async create(projectObj) {
        try {
            const newProject = await this.projectService.createProject(projectObj);
            return {
                succcess: true,
                message: "Project Added Successfully",
                data: newProject,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while adding new project",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllProjects(page = 1, limit = 1000, search) {
        try {
            const allProjects = await this.projectService.getAllProjects({
                page,
                limit,
                search,
            });
            return {
                success: true,
                message: "All Projects Fetched Successfully",
                data: allProjects.data,
                count: allProjects.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching all projects",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProjectById(id) {
        try {
            const project = await this.projectService.getProjectById(id);
            return {
                success: true,
                message: "Project Fetch Successfully",
                data: project,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while fetching all projects",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateProject(id, projectObj) {
        try {
            const updatedProject = await this.projectService.updateProject(id, projectObj);
            return {
                success: true,
                message: "Project updated successfully",
                data: updatedProject,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating project",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteProject(delteDTO) {
        try {
            const deletedProject = await this.projectService.deleteProject(delteDTO.ids);
            return {
                success: true,
                message: "Project Deleted Successfully",
                data: deletedProject,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting project",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)("createProject"),
    (0, swagger_1.ApiBody)({ type: project_dto_1.ProjectDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAllProjects"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)("/getProject/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Put)("updateProject/:id"),
    (0, swagger_1.ApiBody)({ type: project_dto_1.ProjectDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiBody)({ type: deleteProject_dto_1.DeleteProjectDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteProject_dto_1.DeleteProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)("Project"),
    (0, common_1.Controller)("project"),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map