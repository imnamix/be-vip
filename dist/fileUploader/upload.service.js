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
exports.UploadService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const typeorm_2 = require("typeorm");
const fileUpload_entity_1 = require("./fileUpload.entity");
const s3_service_1 = require("./s3.service");
const path_1 = require("path");
const sharp = require("sharp");
const system_enums_1 = require("../global/system.enums");
const project_entity_1 = require("../project/entity/project.entity");
const officeLocation_entity_1 = require("../officeLocation/entity/officeLocation.entity");
const newsBlogs_entity_1 = require("../newsAndBlogs/entity/newsBlogs.entity");
const homepage_entity_1 = require("../homePage/entity/homepage.entity");
const customer_entity_1 = require("../customer/entity/customer.entity");
const aboutus_entity_1 = require("../aboutus/entity/aboutus.entity");
const projectLocation_entity_1 = require("../projectLocation/entity/projectLocation.entity");
let UploadService = class UploadService {
    constructor(fileUploadRepo, s3service, projectRepo, plantLocRepo, officeLocRepo, newsBlogRepo, homepageRepo, customersRepo, aboutUsRepo) {
        this.fileUploadRepo = fileUploadRepo;
        this.s3service = s3service;
        this.projectRepo = projectRepo;
        this.plantLocRepo = plantLocRepo;
        this.officeLocRepo = officeLocRepo;
        this.newsBlogRepo = newsBlogRepo;
        this.homepageRepo = homepageRepo;
        this.customersRepo = customersRepo;
        this.aboutUsRepo = aboutUsRepo;
        this.bucketName = process.env.BUCKET_NAME;
        this.cdn_key = process.env.CDN_URL;
        this.s3 = new AWS.S3({
            region: process.env.BUCKET_REGION,
            accessKeyId: process.env.BUCKET_ACCESS_KEY,
            secretAccessKey: process.env.BUCKET_SECRET_KEY,
        });
        if (!this.bucketName) {
            throw new Error("Bucket name is not defined in environment variables");
        }
    }
    async uploadToWasabi(file, entityName) {
        const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
        const folderPath = entityName ? `gallery/${entityName}/` : "gallery/";
        const fileExtension = (0, path_1.extname)(file.originalname);
        const fileNameWithoutExt = randomName;
        const fullPath = `${folderPath}${fileNameWithoutExt}${fileExtension}`;
        const thumbnailPath = `${folderPath}thumbnails/${fileNameWithoutExt}_thumb${fileExtension}`;
        try {
            let uploadPromises = [];
            let thumbnailUrl = null;
            const params = {
                Bucket: this.bucketName,
                Key: fullPath,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            uploadPromises.push(this.s3.upload(params).promise());
            if (file.mimetype.startsWith("image/")) {
                try {
                    const thumbnailBuffer = await sharp(file.buffer)
                        .resize(400, 300, {
                        fit: "cover",
                        position: "center",
                    })
                        .toBuffer();
                    const thumbnailParams = {
                        Bucket: this.bucketName,
                        Key: thumbnailPath,
                        Body: thumbnailBuffer,
                        ContentType: file.mimetype,
                    };
                    uploadPromises.push(this.s3.upload(thumbnailParams).promise());
                }
                catch (error) {
                    console.error("Error generating thumbnail:", error);
                }
            }
            const results = await Promise.all(uploadPromises);
            const originalResult = results[0];
            if (!originalResult) {
                throw new common_1.HttpException("File upload failed: No response from Amazon S3", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const access_url = `${this.cdn_key}/${fullPath}`;
            if (results.length > 1) {
                thumbnailUrl = `${this.cdn_key}/${thumbnailPath}`;
            }
            return {
                originalName: file.originalname,
                filename: fullPath,
                fileType: file.mimetype,
                size: file.size,
                access_url: access_url,
                thumbnail_url: thumbnailUrl,
                date: new Date(),
            };
        }
        catch (error) {
            console.error("Error uploading file:", error);
            throw new common_1.HttpException("Failed to upload file to Amazon S3", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSignedUrl(filepath) {
        try {
            const params = {
                Bucket: this.bucketName,
                Key: filepath,
                Expires: 43200,
            };
            return await this.s3.getSignedUrlPromise("getObject", params);
        }
        catch (error) {
            return error;
        }
    }
    async deleteFile(filepath, moduleName, id) {
        try {
            const params = {
                Bucket: this.bucketName,
                Key: filepath,
            };
            if (!filepath) {
                return { success: false, message: "File Path Not Fond" };
            }
            let repository;
            switch (moduleName) {
                case system_enums_1.MODULE.PROJECT:
                    repository = this.projectRepo;
                    break;
                case system_enums_1.MODULE.PLANT_LOCATION:
                    repository = this.plantLocRepo;
                    break;
                case system_enums_1.MODULE.OFFICE_LOCATION:
                    repository = this.officeLocRepo;
                    break;
                case system_enums_1.MODULE.NEWS_BLOGS:
                    repository = this.newsBlogRepo;
                    break;
                case system_enums_1.MODULE.HOMEPAGE:
                    repository = this.homepageRepo;
                    break;
                case system_enums_1.MODULE.CUSTOMERS:
                    repository = this.customersRepo;
                    break;
                case system_enums_1.MODULE.ABOUT_US:
                    repository = this.aboutUsRepo;
                    break;
            }
            const entity = await repository.findOne({ where: { id: id } });
            if (!entity) {
                throw new common_1.HttpException(`${moduleName} entity not found`, common_1.HttpStatus.NOT_FOUND);
            }
            let fileExists = false;
            if (Array.isArray(entity.media)) {
                entity.media = entity.media.filter((img) => {
                    if (img?.media_url?.includes(filepath)) {
                        fileExists = true;
                        return false;
                    }
                    return true;
                });
            }
            if (!fileExists) {
                await this.s3.deleteObject(params).promise();
                return { success: true, message: "File deleted successfully" };
            }
            else {
                await repository.save(entity);
                await this.s3.deleteObject(params).promise();
                return { success: true, message: "File deleted successfully" };
            }
        }
        catch (error) {
            return error;
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fileUpload_entity_1.EN_Upload)),
    __param(2, (0, typeorm_1.InjectRepository)(project_entity_1.EN_Project)),
    __param(3, (0, typeorm_1.InjectRepository)(projectLocation_entity_1.EN_ProjectLocation)),
    __param(4, (0, typeorm_1.InjectRepository)(officeLocation_entity_1.EN_OfficeLocation)),
    __param(5, (0, typeorm_1.InjectRepository)(newsBlogs_entity_1.EN_NewsBlogs)),
    __param(6, (0, typeorm_1.InjectRepository)(homepage_entity_1.EN_HomePage)),
    __param(7, (0, typeorm_1.InjectRepository)(customer_entity_1.EN_Customer)),
    __param(8, (0, typeorm_1.InjectRepository)(aboutus_entity_1.EN_AboutUs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        s3_service_1.S3Service,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UploadService);
//# sourceMappingURL=upload.service.js.map