"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkIndustryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workIndustry_entity_1 = require("./entity/workIndustry.entity");
const workIndustry_controller_1 = require("./workIndustry.controller");
const workIndustry_service_1 = require("./workIndustry.service");
let WorkIndustryModule = class WorkIndustryModule {
};
exports.WorkIndustryModule = WorkIndustryModule;
exports.WorkIndustryModule = WorkIndustryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([workIndustry_entity_1.EN_WorkIndustry])],
        controllers: [workIndustry_controller_1.WorkIndustryController],
        providers: [workIndustry_service_1.WorkIndustryService],
    })
], WorkIndustryModule);
//# sourceMappingURL=workIndustry.module.js.map