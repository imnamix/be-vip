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
exports.EN_Services = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let EN_Services = class EN_Services {
};
exports.EN_Services = EN_Services;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_Services.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Services.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Services.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Services.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 50, default: "service" }),
    __metadata("design:type", String)
], EN_Services.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Services.prototype, "bgImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Services.prototype, "bannerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Services.prototype, "bannerDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], EN_Services.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Services.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Services.prototype, "updated_at", void 0);
exports.EN_Services = EN_Services = __decorate([
    (0, typeorm_1.Entity)("services")
], EN_Services);
//# sourceMappingURL=services.entity.js.map