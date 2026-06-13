"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_service_1 = require("./app.service");
const mailer_1 = require("@nestjs-modules/mailer");
const global_constant_1 = require("./global/global.constant");
const app_controller_1 = require("./app.controller");
const shared_module_1 = require("./shared/shared.module");
const login_module_1 = require("./login/login.module");
const user_module_1 = require("./user/user.module");
const upload_module_1 = require("./fileUploader/upload.module");
const project_module_1 = require("./project/project.module");
const officeLocation_module_1 = require("./officeLocation/officeLocation.module");
const newsBlogs_module_1 = require("./newsAndBlogs/newsBlogs.module");
const homepage_module_1 = require("./homePage/homepage.module");
const clients_module_1 = require("./clients/clients.module");
const customer_module_1 = require("./customer/customer.module");
const aboutus_module_1 = require("./aboutus/aboutus.module");
const enquiry_module_1 = require("./enquiry/enquiry.module");
const events_module_1 = require("./events/events.module");
const projectLocation_module_1 = require("./projectLocation/projectLocation.module");
const brandinfo_module_1 = require("./brandinfo/brandinfo.module");
const services_module_1 = require("./services/services.module");
const contact_info_module_1 = require("./contactInfo/contact-info.module");
const planCategory_module_1 = require("./plancategory/planCategory.module");
const plan_module_1 = require("./plan/plan.module");
const workIndustry_module_1 = require("./workIndustry/workIndustry.module");
const fundedProjects_module_1 = require("./fundedProjects/fundedProjects.module");
require("dotenv").config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: true,
                logging: ["error", "warn", "query"],
                maxQueryExecutionTime: 1000,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "smtp.yandex.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: global_constant_1.COMMUNICATION_MAIL_CONSTANT.EMAIL,
                        pass: global_constant_1.COMMUNICATION_MAIL_CONSTANT.PASSWORD,
                    },
                },
            }),
            shared_module_1.SharedModule,
            login_module_1.LoginModule,
            user_module_1.UserModule,
            upload_module_1.UploadModule,
            project_module_1.ProjectModule,
            projectLocation_module_1.ProjectLocationModule,
            officeLocation_module_1.OfficeLocationModule,
            newsBlogs_module_1.NewsBlogModule,
            homepage_module_1.HomePageModule,
            clients_module_1.ClientsModule,
            customer_module_1.CustomerModule,
            aboutus_module_1.AboutUsModule,
            enquiry_module_1.EnquiryModule,
            events_module_1.EventsModule,
            brandinfo_module_1.BrandInfoModule,
            services_module_1.ServicesModule,
            contact_info_module_1.ContactInfoModule,
            planCategory_module_1.PlanCategoryModule,
            plan_module_1.PlanModule,
            workIndustry_module_1.WorkIndustryModule,
            fundedProjects_module_1.FundedProjectsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map