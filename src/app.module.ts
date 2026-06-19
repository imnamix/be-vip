import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { COMMUNICATION_MAIL_CONSTANT } from "./global/global.constant";
import { AppController } from "./app.controller";
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from "./login/login.module";
import { UserModule } from "./user/user.module";
import { UploadModule } from "./fileUploader/upload.module";
import { ProjectModule } from "./project/project.module";
import { OfficeLocationModule } from "./officeLocation/officeLocation.module";
import { NewsBlogModule } from "./newsAndBlogs/newsBlogs.module";
import { HomePageModule } from "./homePage/homepage.module";
import { ClientsModule } from "./clients/clients.module";
import { CustomerModule } from "./customer/customer.module";
import { AboutUsModule } from "./aboutus/aboutus.module";
import { EnquiryModule } from "./enquiry/enquiry.module";
import { EventsModule } from "./events/events.module";
import { ProjectLocationModule } from "./projectLocation/projectLocation.module";
import { BrandInfoModule } from "./brandinfo/brandinfo.module";
import { ServicesModule } from "./services/services.module";
import { ContactInfoModule } from "./contactInfo/contact-info.module";
import { PlanCategoryModule } from "./plancategory/planCategory.module";
import { PlanModule } from "./plan/plan.module";
import { WorkIndustryModule } from "./workIndustry/workIndustry.module";
import { FundedProjectsModule } from "./fundedProjects/fundedProjects.module";

require("dotenv").config();

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   // Database credentials
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT || "3306", 10),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   // Entities
    //   entities: [__dirname + "/**/*.entity{.ts,.js}"],
    //   // Auto sync (disable in production if possible)
    //   synchronize: process.env.NODE_ENV !== "production",
    //   // Connection pooling - CRITICAL FOR PERFORMANCE
    //   poolSize: 20,
    //   maxQueryExecutionTime: 60000, // 60 seconds timeout
    //   connectTimeout: 10000,
    //   // Query optimization
    //   cache: {
    //     type: "database",
    //     duration: 300000, // 5 minutes cache
    //   },
    //   // Logging - disable for production
    //   logging: process.env.NODE_ENV !== "production" ? ["error", "warn"] : false,
    //   // Required for TiDB Cloud / secure MySQL connections
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   // Retry configuration
    //   retryAttempts: 10,
    //   retryDelay: 3000,
    // }),

    TypeOrmModule.forRoot({
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
    MailerModule.forRoot({
      transport: {
        host: "smtp.yandex.com",
        port: 465,
        secure: true, // SSL for port 465
        auth: {
          user: COMMUNICATION_MAIL_CONSTANT.EMAIL,
          pass: COMMUNICATION_MAIL_CONSTANT.PASSWORD,
        },
      },
    }),

    SharedModule,
    LoginModule,
    UserModule,
    UploadModule,
    ProjectModule,
    ProjectLocationModule,
    OfficeLocationModule,
    NewsBlogModule,
    HomePageModule,
    ClientsModule,
    CustomerModule,
    AboutUsModule,
    EnquiryModule,
    EventsModule,
    BrandInfoModule,
    ServicesModule,
    ContactInfoModule,
    PlanCategoryModule,
    PlanModule,
    WorkIndustryModule,
    FundedProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
