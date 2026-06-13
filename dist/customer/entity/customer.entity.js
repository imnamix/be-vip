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
exports.EN_Customer = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const system_enums_1 = require("../../global/system.enums");
let EN_Customer = class EN_Customer {
};
exports.EN_Customer = EN_Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_Customer.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Customer.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], EN_Customer.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Customer.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 3000, nullable: true, default: null }),
    __metadata("design:type", String)
], EN_Customer.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.status, default: system_enums_1.status.ACTIVE }),
    __metadata("design:type", String)
], EN_Customer.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.customerType, default: system_enums_1.customerType.FEEDBACK }),
    __metadata("design:type", String)
], EN_Customer.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Customer.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Customer.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_Customer.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_Customer.prototype, "updated_by", void 0);
exports.EN_Customer = EN_Customer = __decorate([
    (0, typeorm_1.Entity)("customer")
], EN_Customer);
//# sourceMappingURL=customer.entity.js.map