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
exports.EN_ProjectLocation = void 0;
const typeorm_1 = require("typeorm");
const system_enums_1 = require("../../global/system.enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let EN_ProjectLocation = class EN_ProjectLocation {
};
exports.EN_ProjectLocation = EN_ProjectLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_ProjectLocation.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 700, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 700, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "headline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 2000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 2000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, default: system_enums_1.projectStatus.ONGOING }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "projectStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, default: system_enums_1.projectType.RESIDENTIAL }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "projectType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 700, nullable: true, default: null }),
    (0, class_validator_1.Length)(1, 700),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "reraId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.status, default: system_enums_1.status.ACTIVE }),
    __metadata("design:type", String)
], EN_ProjectLocation.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_ProjectLocation.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_ProjectLocation.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_ProjectLocation.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_ProjectLocation.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_ProjectLocation.prototype, "updated_by", void 0);
exports.EN_ProjectLocation = EN_ProjectLocation = __decorate([
    (0, typeorm_1.Entity)("projectLocation")
], EN_ProjectLocation);
//# sourceMappingURL=projectLocation.entity.js.map