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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EN_OfficeLocation = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const system_enums_1 = require("../../global/system.enums");
let EN_OfficeLocation = class EN_OfficeLocation {
};
exports.EN_OfficeLocation = EN_OfficeLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_OfficeLocation.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true, default: "CONTACT" }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "infoType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 700, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "officeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 700, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 700, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "landmark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "workingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "googleMapLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 15, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "officePhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "officeEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.status, default: "ACTIVE" }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_OfficeLocation.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_OfficeLocation.prototype, "slides", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 2000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "googleEmbedLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "linkedin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "youtube", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_OfficeLocation.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_OfficeLocation.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_OfficeLocation.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_OfficeLocation.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_OfficeLocation.prototype, "updated_by", void 0);
exports.EN_OfficeLocation = EN_OfficeLocation = __decorate([
    (0, typeorm_1.Entity)("officeLocation")
], EN_OfficeLocation);
//# sourceMappingURL=officeLocation.entity.js.map