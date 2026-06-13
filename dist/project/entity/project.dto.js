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
exports.ProjectDTO = exports.availableOptions = exports.PricingTableItem = exports.projectWalkthrough = exports.DataType = exports.MediaItem = void 0;
const swagger_1 = require("@nestjs/swagger");
const system_enums_1 = require("../../global/system.enums");
const class_validator_1 = require("class-validator");
class MediaItem {
}
exports.MediaItem = MediaItem;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MediaItem.prototype, "media_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MediaItem.prototype, "media_type", void 0);
class DataType {
}
exports.DataType = DataType;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DataType.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DataType.prototype, "content", void 0);
class projectWalkthrough extends DataType {
}
exports.projectWalkthrough = projectWalkthrough;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], projectWalkthrough.prototype, "youtubeLink", void 0);
class PricingTableItem {
}
exports.PricingTableItem = PricingTableItem;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PricingTableItem.prototype, "configuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PricingTableItem.prototype, "carpetArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PricingTableItem.prototype, "priceStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], PricingTableItem.prototype, "unitPlan", void 0);
class availableOptions extends DataType {
}
exports.availableOptions = availableOptions;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PricingTableItem] }),
    __metadata("design:type", Array)
], availableOptions.prototype, "pricingTable", void 0);
class ProjectDTO {
}
exports.ProjectDTO = ProjectDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: system_enums_1.projectType }),
    (0, class_validator_1.IsEnum)(system_enums_1.projectType),
    __metadata("design:type", String)
], ProjectDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "reraId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "headline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "subHeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "tagline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "projectOverviewSection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "locationAdvantage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "projectWalkthrough", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "availableOptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "projectSpecification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "gallery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "masterPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], ProjectDTO.prototype, "floorPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: system_enums_1.status }),
    (0, class_validator_1.IsEnum)(system_enums_1.status),
    __metadata("design:type", String)
], ProjectDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProjectDTO.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProjectDTO.prototype, "updated_by", void 0);
//# sourceMappingURL=project.dto.js.map