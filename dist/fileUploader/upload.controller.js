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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const system_enums_1 = require("../global/system.enums");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadS3(files, req) {
        try {
            const uploadPromises = files.map((file) => this.uploadService
                .uploadToWasabi(file)
                .then((res) => ({ success: true, data: res }))
                .catch((error) => ({ success: false, error: error })));
            const results = await Promise.all(uploadPromises);
            return { files: results };
        }
        catch (error) {
            console.error("Upload failed:", error);
            throw new common_1.HttpException("File upload failed", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getImageFromS3(filePath) {
        try {
            if (!filePath) {
                return { success: false, message: "File path is required" };
            }
            const signUrl = await this.uploadService.getSignedUrl(filePath);
            if (!signUrl) {
                return {
                    success: false,
                    message: "file download failed",
                };
            }
            return {
                success: true,
                message: "file downloaded successfully",
                url: signUrl,
            };
        }
        catch (error) {
            throw new common_1.HttpException("Error while downloding file", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteFile(file, moduleName, id) {
        try {
            const deleteFile = await this.uploadService.deleteFile(file, moduleName, id);
            return {
                success: deleteFile.success,
                message: deleteFile.message,
            };
        }
        catch (error) {
            throw new common_1.HttpException("Failed to delete file", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)("uploadS3"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "Files to upload",
        type: "multipart/form-data",
        required: true,
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary",
                    },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 5, { limits: { fileSize: 450 * 1024 * 1024 } })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadS3", null);
__decorate([
    (0, common_1.Get)("getImage"),
    __param(0, (0, common_1.Query)("filePath")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getImageFromS3", null);
__decorate([
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)("file")),
    __param(1, (0, common_1.Query)("moduleName")),
    __param(2, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFile", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)("Upload file"),
    (0, common_1.Controller)("uploadFiles"),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map