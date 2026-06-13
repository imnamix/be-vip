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
exports.EN_Project = void 0;
const typeorm_1 = require("typeorm");
const system_enums_1 = require("../../global/system.enums");
const swagger_1 = require("@nestjs/swagger");
let EN_Project = class EN_Project {
};
exports.EN_Project = EN_Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_Project.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: system_enums_1.projectType, default: system_enums_1.projectType.PROJECT }),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.projectType, default: system_enums_1.projectType.PROJECT }),
    __metadata("design:type", String)
], EN_Project.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "reraId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "headline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "subHeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "tagline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_Project.prototype, "projectOverviewSection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_Project.prototype, "locationAdvantage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_Project.prototype, "projectWalkthrough", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_Project.prototype, "availableOptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_Project.prototype, "projectSpecification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json", nullable: true, default: null }),
    __metadata("design:type", Array)
], EN_Project.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_Project.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_Project.prototype, "gallery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_Project.prototype, "masterPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 2000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Project.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_Project.prototype, "floorPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.status, default: system_enums_1.status.ACTIVE }),
    __metadata("design:type", String)
], EN_Project.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Project.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Project.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_Project.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_Project.prototype, "updated_by", void 0);
exports.EN_Project = EN_Project = __decorate([
    (0, typeorm_1.Entity)("project")
], EN_Project);
//# sourceMappingURL=project.entity.js.map