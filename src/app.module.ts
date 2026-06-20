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
import { HomePageModule } from "./homePage/homepage.module";
import { CustomerModule } from "./customer/customer.module";
import { AboutUsModule } from "./aboutus/aboutus.module";
import { EnquiryModule } from "./enquiry/enquiry.module";
import { EventsModule } from "./events/events.module";
import { BrandInfoModule } from "./brandinfo/brandinfo.module";
import { ServicesModule } from "./services/services.module";
import { GalleryModule } from "./gallery/gallery.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { VideoTestimonialsModule } from "./videoTestimonials/video-testimonials.module";
import { FaqsModule } from "./faqs/faqs.module";
import { ServicePageModule } from "./servicePage/service-page.module";
import { ContactModule } from "./contact/contact.module";

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
    HomePageModule,
    CustomerModule,
    AboutUsModule,
    EnquiryModule,
    EventsModule,
    BrandInfoModule,
    ServicesModule,
    GalleryModule,
    TestimonialsModule,
    VideoTestimonialsModule,
    FaqsModule,
    ServicePageModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
