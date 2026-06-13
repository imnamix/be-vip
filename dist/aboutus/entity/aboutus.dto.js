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
exports.AboutusDTO = exports.WhyChooseUsItem = exports.Achievement = exports.MediaItem = void 0;
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
class Achievement {
}
exports.Achievement = Achievement;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Achievement.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Achievement.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", MediaItem)
], Achievement.prototype, "image", void 0);
class WhyChooseUsItem {
}
exports.WhyChooseUsItem = WhyChooseUsItem;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WhyChooseUsItem.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WhyChooseUsItem.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WhyChooseUsItem.prototype, "icon", void 0);
class AboutusDTO {
}
exports.AboutusDTO = AboutusDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "businessDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], AboutusDTO.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], AboutusDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "mission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "vision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "ourValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WhyChooseUsItem] }),
    __metadata("design:type", Array)
], AboutusDTO.prototype, "whyChooseUs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MediaItem] }),
    __metadata("design:type", Array)
], AboutusDTO.prototype, "homepageAboutUsBgImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "bannerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AboutusDTO.prototype, "bannerDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Achievement] }),
    __metadata("design:type", Array)
], AboutusDTO.prototype, "achievements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: system_enums_1.achievementType }),
    (0, class_validator_1.IsEnum)(system_enums_1.achievementType),
    __metadata("design:type", String)
], AboutusDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: system_enums_1.status }),
    (0, class_validator_1.IsEnum)(system_enums_1.status),
    __metadata("design:type", String)
], AboutusDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AboutusDTO.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AboutusDTO.prototype, "updated_by", void 0);
//# sourceMappingURL=aboutus.dto.js.map