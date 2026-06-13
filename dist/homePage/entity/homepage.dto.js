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
exports.HomePageDTO = exports.StatItem = exports.SlideItem = void 0;
const swagger_1 = require("@nestjs/swagger");
class SlideItem {
}
exports.SlideItem = SlideItem;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SlideItem.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SlideItem.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SlideItem.prototype, "image", void 0);
class StatItem {
}
exports.StatItem = StatItem;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StatItem.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StatItem.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StatItem.prototype, "icon", void 0);
class HomePageDTO {
}
exports.HomePageDTO = HomePageDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StatItem] }),
    __metadata("design:type", Array)
], HomePageDTO.prototype, "stats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SlideItem] }),
    __metadata("design:type", Array)
], HomePageDTO.prototype, "slides", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "footer_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "contactus_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "aboutus_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "services_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "projects_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "events_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], HomePageDTO.prototype, "home_contact_bg_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], HomePageDTO.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], HomePageDTO.prototype, "updated_by", void 0);
//# sourceMappingURL=homepage.dto.js.map