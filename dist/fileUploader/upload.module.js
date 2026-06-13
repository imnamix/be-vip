"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const typeorm_1 = require("@nestjs/typeorm");
const fileUpload_entity_1 = require("./fileUpload.entity");
const s3_service_1 = require("./s3.service");
const project_entity_1 = require("../project/entity/project.entity");
const aboutus_entity_1 = require("../aboutus/entity/aboutus.entity");
const customer_entity_1 = require("../customer/entity/customer.entity");
const homepage_entity_1 = require("../homePage/entity/homepage.entity");
const newsBlogs_entity_1 = require("../newsAndBlogs/entity/newsBlogs.entity");
const officeLocation_entity_1 = require("../officeLocation/entity/officeLocation.entity");
const projectLocation_entity_1 = require("../projectLocation/entity/projectLocation.entity");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService, s3_service_1.S3Service],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                fileUpload_entity_1.EN_Upload,
                project_entity_1.EN_Project,
                aboutus_entity_1.EN_AboutUs,
                customer_entity_1.EN_Customer,
                homepage_entity_1.EN_HomePage,
                newsBlogs_entity_1.EN_NewsBlogs,
                officeLocation_entity_1.EN_OfficeLocation,
                projectLocation_entity_1.EN_ProjectLocation,
            ]),
        ],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map