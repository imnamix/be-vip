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
exports.EN_User = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const role_entity_1 = require("./role.entity");
const system_enums_1 = require("../../global/system.enums");
let EN_User = class EN_User {
};
exports.EN_User = EN_User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        length: 500,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], EN_User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        length: 100,
        unique: true,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], EN_User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, select: false }),
    __metadata("design:type", String)
], EN_User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        length: 10,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], EN_User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: system_enums_1.gender,
        default: system_enums_1.gender.MALE,
    }),
    __metadata("design:type", String)
], EN_User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.EN_Role, (role) => role.users),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", role_entity_1.EN_Role)
], EN_User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: system_enums_1.status, default: system_enums_1.status.ACTIVE }),
    __metadata("design:type", String)
], EN_User.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_User.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_User.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_User.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], EN_User.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "integer", select: false, nullable: true, default: null }),
    __metadata("design:type", Number)
], EN_User.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "timestamp", select: false, nullable: true, default: null }),
    __metadata("design:type", Date)
], EN_User.prototype, "otpExpiresAt", void 0);
exports.EN_User = EN_User = __decorate([
    (0, typeorm_1.Entity)("user")
], EN_User);
//# sourceMappingURL=user.entity.js.map