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
exports.NewsBlogsDTO = void 0;
const system_enums_1 = require("../../global/system.enums");
const crud_1 = require("@nestjsx/crud/lib/crud");
const project_dto_1 = require("../../project/entity/project.dto");
const class_validator_1 = require("class-validator");
class NewsBlogsDTO {
}
exports.NewsBlogsDTO = NewsBlogsDTO;
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], NewsBlogsDTO.prototype, "author", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], NewsBlogsDTO.prototype, "headline", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], NewsBlogsDTO.prototype, "description", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ enum: system_enums_1.productType }),
    (0, class_validator_1.IsEnum)(system_enums_1.productType),
    __metadata("design:type", String)
], NewsBlogsDTO.prototype, "type", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ enum: system_enums_1.status }),
    (0, class_validator_1.IsEnum)(system_enums_1.status),
    __metadata("design:type", String)
], NewsBlogsDTO.prototype, "status", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], NewsBlogsDTO.prototype, "isPublished", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Date)
], NewsBlogsDTO.prototype, "issueDate", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ type: [project_dto_1.MediaItem] }),
    __metadata("design:type", Array)
], NewsBlogsDTO.prototype, "media", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Number)
], NewsBlogsDTO.prototype, "created_by", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Number)
], NewsBlogsDTO.prototype, "updated_by", void 0);
//# sourceMappingURL=newsBlogs.dto.js.map