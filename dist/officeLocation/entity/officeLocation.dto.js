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
exports.OfficeLocationDTO = exports.SlideItem = exports.MediaItem = void 0;
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
class SlideItem {
}
exports.SlideItem = SlideItem;
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], SlideItem.prototype, "title", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], SlideItem.prototype, "description", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], SlideItem.prototype, "image", void 0);
class OfficeLocationDTO {
}
exports.OfficeLocationDTO = OfficeLocationDTO;
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "infoType", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "officeNumber", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "street", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "landmark", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "city", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "state", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "workingHours", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "country", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "postalCode", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "googleMapLink", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "officePhone", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "officeEmail", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ enum: system_enums_1.status }),
    (0, class_validator_1.IsEnum)(system_enums_1.status),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "status", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], OfficeLocationDTO.prototype, "media", void 0);
__decorate([
    (0, crud_1.ApiProperty)({ type: [SlideItem], required: false }),
    __metadata("design:type", Array)
], OfficeLocationDTO.prototype, "slides", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "googleEmbedLink", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "linkedin", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "facebook", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "instagram", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "youtube", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], OfficeLocationDTO.prototype, "whatsapp", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Number)
], OfficeLocationDTO.prototype, "created_by", void 0);
__decorate([
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", Number)
], OfficeLocationDTO.prototype, "updated_by", void 0);
//# sourceMappingURL=officeLocation.dto.js.map