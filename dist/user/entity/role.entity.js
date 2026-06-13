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
exports.EN_Role = void 0;
const typeorm_1 = require("typeorm");
const system_enums_1 = require("../../global/system.enums");
const swagger_1 = require("@nestjs/swagger");
const permission_entity_1 = require("./permission.entity");
const user_entity_1 = require("./user.entity");
let EN_Role = class EN_Role {
};
exports.EN_Role = EN_Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EN_Role.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: system_enums_1.userRoles,
        default: system_enums_1.userRoles.USER,
    }),
    __metadata("design:type", String)
], EN_Role.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.EN_User, (user) => user.role),
    __metadata("design:type", Array)
], EN_Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.EN_Permission, (permission) => permission.roles),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], EN_Role.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Role.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], EN_Role.prototype, "updated_at", void 0);
exports.EN_Role = EN_Role = __decorate([
    (0, typeorm_1.Entity)("role")
], EN_Role);
//# sourceMappingURL=role.entity.js.map