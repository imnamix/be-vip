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
exports.ProjectLocationDTO = exports.MediaItem = void 0;
const crud_1 = require("@nestjsx/crud/lib/crud");
const class_validator_1 = require("class-validator");
const system_enums_1 = require("../../global/system.enums");
class MediaItem {
}
exports.MediaItem = MediaItem;
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], MediaItem.prototype, "media_url", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], MediaItem.prototype, "media_type", void 0);
class ProjectLocationDTO {
}
exports.ProjectLocationDTO = ProjectLocationDTO;
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "projectName", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "headline", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "address", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "description", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "projectStatus", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "projectType", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "reraId", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ enum: system_enums_1.status }),
    (0, class_validator_1.IsEnum)(system_enums_1.status),
    __metadata("design:type", String)
], ProjectLocationDTO.prototype, "status", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], ProjectLocationDTO.prototype, "media", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProjectLocationDTO.prototype, "created_by", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProjectLocationDTO.prototype, "updated_by", void 0);
//# sourceMappingURL=projectLocation.dto.js.map