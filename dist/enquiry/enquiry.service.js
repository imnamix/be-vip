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
exports.EnquiryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enquiry_entity_1 = require("./entity/enquiry.entity");
const typeorm_2 = require("typeorm");
const mailService_1 = require("../EmailService/mailService");
let EnquiryService = class EnquiryService {
    constructor(enquiryRepo, emailService) {
        this.enquiryRepo = enquiryRepo;
        this.emailService = emailService;
    }
    async createEnquiry(payload) {
        try {
            const newEnquiry = this.enquiryRepo.create(payload);
            const savedEnquiry = await this.enquiryRepo.save(newEnquiry);
            const adminEmail = process.env.ADMIN_EMAIL;
            await this.emailService.sendEnquiryEmail(adminEmail, savedEnquiry);
            return {
                success: true,
                message: "Enquiry created successfully",
                data: savedEnquiry,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getAllEnquiry(pagination) {
        try {
            const { page, limit, search } = pagination;
            let pageSize = 1000000;
            let skip = 0;
            if (page) {
                if (limit && limit > 0) {
                    pageSize = limit;
                    skip = limit * (page - 1);
                }
            }
            const [data, total] = await this.enquiryRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
                where: search
                    ? [
                        { name: (0, typeorm_2.Like)(`%${search}%`) },
                        { mobile: (0, typeorm_2.Like)(`%${search}%`) },
                    ]
                    : null,
            });
            if (!data) {
                throw new common_1.HttpException("Enble to find Enquiries", common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: "Successfully fetch all Enquiries",
                data: data,
                count: total,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteEnquiry(id) {
        try {
            const deleteEnquiry = await this.enquiryRepo.findBy({ id: (0, typeorm_2.In)(id) });
            if (deleteEnquiry.length === 0) {
                throw new common_1.HttpException(`Id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            await this.enquiryRepo.delete(id);
            return {
                success: true,
                message: "Enquiry deleted successfully",
                data: deleteEnquiry,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.EnquiryService = EnquiryService;
exports.EnquiryService = EnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enquiry_entity_1.EN_Enquiry)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailService_1.EmailService])
], EnquiryService);
//# sourceMappingURL=enquiry.service.js.map