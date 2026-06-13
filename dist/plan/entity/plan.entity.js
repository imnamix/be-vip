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
exports.EN_Plan = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const planCategory_entity_1 = require("../../plancategory/entity/planCategory.entity");
let EN_Plan = class EN_Plan {
};
exports.EN_Plan = EN_Plan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_Plan.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], EN_Plan.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "banner_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "banner_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "banner_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "plan_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "video_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "video_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", String)
], EN_Plan.prototype, "video_link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], EN_Plan.prototype, "plan_category_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => planCategory_entity_1.EN_PlanCategory, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "plan_category_id" }),
    __metadata("design:type", planCategory_entity_1.EN_PlanCategory)
], EN_Plan.prototype, "plan_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], EN_Plan.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Plan.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Plan.prototype, "updated_at", void 0);
exports.EN_Plan = EN_Plan = __decorate([
    (0, typeorm_1.Entity)("plans")
], EN_Plan);
//# sourceMappingURL=plan.entity.js.map