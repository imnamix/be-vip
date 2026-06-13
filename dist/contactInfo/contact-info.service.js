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
exports.ContactInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contact_info_entity_1 = require("./entity/contact-info.entity");
const typeorm_2 = require("typeorm");
let ContactInfoService = class ContactInfoService {
    constructor(contactInfoRepo) {
        this.contactInfoRepo = contactInfoRepo;
    }
    async create(obj) {
        try {
            const newData = this.contactInfoRepo.create(obj);
            return await this.contactInfoRepo.save(newData);
        }
        catch (error) {
            return error;
        }
    }
    async getAll(status) {
        try {
            let whereCondition = undefined;
            if (status === "active") {
                whereCondition = { status: 1 };
            }
            else if (!status) {
                whereCondition = { status: 1 };
            }
            const data = await this.contactInfoRepo.find({
                where: whereCondition,
                order: { created_at: "DESC" },
            });
            return {
                success: true,
                message: "Contact info fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching contact info",
                error: error,
            };
        }
    }
    async getById(id) {
        try {
            const data = await this.contactInfoRepo.findOne({
                where: { id, status: 1 },
            });
            if (!data) {
                return {
                    success: false,
                    message: `Contact info with id ${id} not found`,
                    data: null,
                };
            }
            return {
                success: true,
                message: "Contact info fetched successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while fetching contact info",
                error: error,
            };
        }
    }
    async update(id, obj) {
        try {
            let contactInfo = await this.contactInfoRepo.findOne({
                where: { id },
            });
            if (!contactInfo) {
                return {
                    success: false,
                    message: `Contact info with id ${id} not found`,
                };
            }
            const updatedContactInfo = Object.assign(contactInfo, obj);
            const data = await this.contactInfoRepo.save(updatedContactInfo);
            return {
                success: true,
                message: "Contact info updated successfully",
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while updating contact info",
                error: error,
            };
        }
    }
    async delete(id) {
        try {
            const contactInfo = await this.contactInfoRepo.findOne({
                where: { id },
            });
            if (!contactInfo) {
                return {
                    success: false,
                    message: `Contact info with id ${id} not found`,
                };
            }
            await this.contactInfoRepo.remove(contactInfo);
            return {
                success: true,
                message: "Contact info deleted successfully",
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Error while deleting contact info",
                error: error,
            };
        }
    }
};
exports.ContactInfoService = ContactInfoService;
exports.ContactInfoService = ContactInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_info_entity_1.EN_ContactInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactInfoService);
//# sourceMappingURL=contact-info.service.js.map