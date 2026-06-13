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
exports.FileUploaderController = exports.FileEntity = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const session_service_1 = require("../shared/services/session.service");
const fs = require("fs");
var appRoot = require("app-root-path");
class FileEntity {
}
exports.FileEntity = FileEntity;
var multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");
const s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    region: "us-west-1",
    accessKeyId: process.env.WASSABI_ACCESS,
    secretAccessKey: process.env.WASSABI_SECRET,
});
var storageS3 = multerS3({
    s3: s3,
    bucket: "pinnacle-test-bucket",
    acl: "public-read",
    key: function (request, file, callback) {
        let entityName = request.query.entityName
            ? request.query.entityName + "/"
            : "";
        var dir = `gallery/${entityName}`;
        let p1 = Date.now();
        let p2 = Date.now();
        if (process) {
            var hrTime = process.hrtime();
            if (hrTime[0] && hrTime[1]) {
                p2 = hrTime[0] * 1000000000 + hrTime[1];
            }
        }
        const randomName = `${p1}-${p2}`;
        console.log("KEY : ");
        callback(null, `${dir}${randomName}${(0, path_1.extname)(file.originalname)}`);
    },
    url: function (req, file, cb) {
        console.log("REQ, ", req);
        console.log("FILE : ", file);
    },
});
let FileUploaderController = class FileUploaderController {
    constructor(ss) {
        this.ss = ss;
    }
    async upload(file, createCatDto) {
        console.log(file);
        return file.path.split("public/gallery/")[1];
    }
    async serveAvatar(entityName, entityId, res) {
        let fileName = "$_$" + entityId + "$_$";
        let ext = [
            ".png",
            ".jpeg",
            ".jpg",
            ".svg",
            ".csv",
            ".xls",
            ".xlsx",
            ".pdf",
            ".doc",
            ".docx",
        ];
        let finalExt = "";
        for (let i in ext) {
            if (fs.existsSync(`${appRoot}/public/gallery/${entityName}/` + fileName + "" + ext[i])) {
                finalExt = ext[i];
                break;
            }
        }
        fileName += finalExt;
        res.sendFile(fileName, { root: `${appRoot}/public/gallery/${entityName}` });
    }
    async upload2(file, query, createCatDto) {
        let entityName = query.entityName || "";
        let filePath = `${entityName}/${file.filename}`;
        return { success: true, path: filePath };
    }
    async serveAvatar2(query, res) {
        let entityName = query.path;
        if (!fs.existsSync(`${appRoot}/public/gallery/${entityName}`)) {
            res.sendFile(entityName, { root: `${appRoot}/public/gallery/` });
        }
        else {
            if (entityName && entityName.length > 0) {
                res.sendFile(entityName, { root: `${appRoot}/public/gallery` });
            }
            else {
                res.send({ error: "filenotfound" });
            }
        }
    }
    async upload4(files, query, SessionService, createCatDto) {
        let entityName = query.entityName || "";
        let filePaths = [];
        files.forEach((element) => {
            let doc = {
                originalName: element.originalname,
                filename: element.filename,
                fileType: element.mimetype,
                size: element.size,
                date: new Date(),
                role: this.ss.get().role,
                id: this.ss.get().id,
            };
            filePaths.push(doc);
        });
        return { success: true, files: filePaths };
    }
    async uploadS3(files, req) {
        let filePaths = [];
        console.log("Files : ", files);
        files.forEach((element) => {
            let doc = {
                originalName: element.originalname,
                filename: element.key,
                fileType: element.mimetype,
                size: element.size,
                date: new Date(),
                access_url: element.location,
            };
            filePaths.push(doc);
        });
        return { success: true, files: filePaths };
    }
    async getS3Url(query, res) {
        const baseUrl = `https://s3.us-west-1.wasabisys.com/${process.env.WASABI_BUCKET}/`;
        let entityName = query.path;
        const fileUrl = `${baseUrl}${entityName}`;
        var params = {
            Key: `${entityName}`,
            Bucket: process.env.WASABI_BUCKET,
        };
        try {
            const fileStream = s3.getObject(params).createReadStream();
            fileStream.pipe(res);
        }
        catch (error) {
            res.send({ error: "File Not Found" });
        }
    }
};
exports.FileUploaderController = FileUploaderController;
__decorate([
    (0, common_1.Post)("upload"),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("filename", {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                let entityName = req.query.entityName || "";
                var dir = `${appRoot}/public/gallery/${entityName}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                return cb(null, dir);
            },
            filename: (req, file, cb) => {
                let entityId = req.query.entityId || "";
                const randomName = "$_$" + entityId + "$_$";
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FileEntity]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)("file/:entityName/:entityId"),
    __param(0, (0, common_1.Param)("entityName")),
    __param(1, (0, common_1.Param)("entityId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "serveAvatar", null);
__decorate([
    (0, common_1.Post)("upload2"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("filename", {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                let entityName = req.query.entityName || "";
                var dir = `${appRoot}/public/gallery/${entityName}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                return cb(null, dir);
            },
            filename: (req, file, cb) => {
                const randomName = "$_$" + new Date().getTime() + "$_$";
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, FileEntity]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "upload2", null);
__decorate([
    (0, common_1.Get)("file2"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "serveAvatar2", null);
__decorate([
    (0, common_1.Post)("upload4"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 30, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                let entityName = req.query.entityName || "";
                var dir = `${appRoot}/public/gallery/${entityName}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                return cb(null, dir);
            },
            filename: (req, file, cb) => {
                const randomName = "$_$" + new Date().getTime() + "$_$";
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, FileEntity]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "upload4", null);
__decorate([
    (0, common_1.Post)("uploadS3"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiQuery)({
        name: "entityName",
        description: "Provide entity name",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 30, {
        storage: storageS3,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "uploadS3", null);
__decorate([
    (0, common_1.Get)("downloadS3"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileUploaderController.prototype, "getS3Url", null);
exports.FileUploaderController = FileUploaderController = __decorate([
    (0, common_1.Controller)("file-uploader"),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], FileUploaderController);
//# sourceMappingURL=file-uploader.controller.js.map