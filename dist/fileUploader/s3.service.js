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
exports.S3Service = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const typeorm_2 = require("typeorm");
const fileUpload_entity_1 = require("./fileUpload.entity");
let S3Service = class S3Service {
    constructor(fileUploadRepo) {
        this.fileUploadRepo = fileUploadRepo;
        this.s3Client = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION,
        });
        this.uploadParams = {
            Bucket: process.env.BUCKET,
            Key: '',
            Body: null,
            ContentType: 'application/pdf',
            ContentDisposition: 'inline',
        };
    }
    async uploadLetterPdf(pdfBuffer, details) {
        if (!pdfBuffer) {
            throw new Error('No PDF buffer received for upload');
        }
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const fileName = `${details.employeeName.replace(/ /g, '_')}_${details.letterType.replace(/ /g, '_')}_${timestamp}.pdf`;
        this.uploadParams.Body = pdfBuffer;
        this.uploadParams.Key = `${details.uId}/${fileName}`;
        try {
            const s3Data = await this.s3Client.upload(this.uploadParams).promise();
            const saveData = {
                fileName: 'letter.pdf',
                fileUrl: s3Data.Location,
                fileType: 'application/pdf',
                key: s3Data.Key,
                bucket: process.env.BUCKET,
            };
            const savedDoc = this.fileUploadRepo.create(saveData);
            await this.fileUploadRepo.save(savedDoc);
            return {
                fileUrl: s3Data.Location,
                key: s3Data.Key,
                bucket: process.env.BUCKET,
            };
        }
        catch (error) {
            console.error('Error uploading PDF to S3:', error);
            throw new Error('Failed to upload PDF to S3');
        }
    }
    async deleteFileFromS3(key) {
        const params = {
            Bucket: process.env.BUCKET,
            Key: key,
        };
        try {
            await this.s3Client.deleteObject(params).promise();
        }
        catch (error) {
            console.error('Error deleting file from S3:', error);
            throw new Error(`Failed to delete file from S3: ${error.message}`);
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fileUpload_entity_1.EN_Upload)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], S3Service);
//# sourceMappingURL=s3.service.js.map