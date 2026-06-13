"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const planCategory_entity_1 = require("./entity/planCategory.entity");
const planCategory_controller_1 = require("./planCategory.controller");
const planCategory_service_1 = require("./planCategory.service");
let PlanCategoryModule = class PlanCategoryModule {
};
exports.PlanCategoryModule = PlanCategoryModule;
exports.PlanCategoryModule = PlanCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([planCategory_entity_1.EN_PlanCategory])],
        controllers: [planCategory_controller_1.PlanCategoryController],
        providers: [planCategory_service_1.PlanCategoryService],
    })
], PlanCategoryModule);
//# sourceMappingURL=planCategory.module.js.map