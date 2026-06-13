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
exports.RouteMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const session_service_1 = require("../shared/services/session.service");
const moment = require("moment");
let RouteMiddleware = class RouteMiddleware {
    constructor(ss) {
        this.ss = ss;
    }
    use(req, res, next) {
        let virtualview = 0;
        let tokenInfo = undefined;
        if (req.headers) {
            if (req.headers.virtualview) {
                virtualview = req.headers.virtualview;
            }
            if (req.headers.authorization) {
                tokenInfo = jwt.decode(req.headers.authorization.split(' ')[1]);
                if (tokenInfo) {
                    tokenInfo.virtualview = virtualview;
                    req['sessionService'] = this.ss;
                    this.ss.set(tokenInfo);
                }
            }
        }
        else {
            this.ss.set(null);
        }
        if (req.body) {
            if (req.method === 'POST') {
                req.body.createdBy = this.ss.getUserId() || 0;
                req.body.updatedBy = this.ss.getUserId() || 0;
                if (!req.body.createdDate) {
                    req.body.createdDate = moment().format('YYYY-MM-DD h:mm:ss');
                }
                req.body.updatedDate = moment().format('YYYY-MM-DD h:mm:ss');
            }
            else if (req.method === 'PUT') {
                req.body.updatedBy = this.ss.getUserId();
                req.body.updatedDate = moment().format('YYYY-MM-DD h:mm:ss');
            }
        }
        next();
    }
};
exports.RouteMiddleware = RouteMiddleware;
exports.RouteMiddleware = RouteMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], RouteMiddleware);
//# sourceMappingURL=route.middleware.js.map