"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const session_service_1 = require("./services/session.service");
const query_helper_service_1 = require("./services/query.helper.service");
const utility_helper_1 = require("./services/utility.helper");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [query_helper_service_1.QueryHelper, session_service_1.SessionService, utility_helper_1.UtilityHelper],
        exports: [session_service_1.SessionService, query_helper_service_1.QueryHelper, utility_helper_1.UtilityHelper],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map