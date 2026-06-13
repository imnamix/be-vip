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
exports.EnquiryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enquiry_service_1 = require("./enquiry.service");
const enquiry_dto_1 = require("./entity/enquiry.dto");
let EnquiryController = class EnquiryController {
    constructor(enquiryService) {
        this.enquiryService = enquiryService;
    }
    async create(payload) {
        try {
            const newEnquiry = await this.enquiryService.createEnquiry(payload);
            return {
                success: true,
                message: "Enquiry send successfully.",
                data: newEnquiry,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Sending New Enquiry",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllEnquiry(page = 1, limit = 1000, search) {
        try {
            const allData = await this.enquiryService.getAllEnquiry({
                page,
                limit,
                search,
            });
            return {
                success: allData.success,
                message: allData.message,
                data: allData.data,
                count: allData.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While fetching Enquires",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteEnquiry(id) {
        try {
            const data = await this.enquiryService.deleteEnquiry(id.ids);
            return {
                success: data.success,
                message: data.message,
                data: data.data,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While fetching Enquires",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EnquiryController = EnquiryController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: enquiry_dto_1.EnquiryDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enquiry_dto_1.EnquiryDTO]),
    __metadata("design:returntype", Promise)
], EnquiryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("allEnquiries"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], EnquiryController.prototype, "getAllEnquiry", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiBody)({ type: enquiry_dto_1.DeleteEnquiryDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enquiry_dto_1.DeleteEnquiryDTO]),
    __metadata("design:returntype", Promise)
], EnquiryController.prototype, "deleteEnquiry", null);
exports.EnquiryController = EnquiryController = __decorate([
    (0, swagger_1.ApiTags)("enquiry"),
    (0, common_1.Controller)("enquiry"),
    __metadata("design:paramtypes", [enquiry_service_1.EnquiryService])
], EnquiryController);
//# sourceMappingURL=enquiry.controller.js.map