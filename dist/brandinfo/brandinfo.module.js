"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const brandinfo_entity_1 = require("./entity/brandinfo.entity");
const brandinfo_controller_1 = require("./brandinfo.controller");
const brandinfo_service_1 = require("./brandinfo.service");
let BrandInfoModule = class BrandInfoModule {
};
exports.BrandInfoModule = BrandInfoModule;
exports.BrandInfoModule = BrandInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([brandinfo_entity_1.EN_BrandInfo])],
        controllers: [brandinfo_controller_1.BrandInfoController],
        providers: [brandinfo_service_1.BrandInfoService],
    })
], BrandInfoModule);
//# sourceMappingURL=brandinfo.module.js.map