import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Upload } from "./fileUpload.entity";
import { S3Service } from "./s3.service";
import { EN_Project } from "../project/entity/project.entity";
import { EN_AboutUs } from "../aboutus/entity/aboutus.entity";
import { EN_Customer } from "../customer/entity/customer.entity";
import { EN_HomePage } from "../homePage/entity/homepage.entity";
import { EN_NewsBlogs } from "../newsAndBlogs/entity/newsBlogs.entity";
import { EN_OfficeLocation } from "../officeLocation/entity/officeLocation.entity";
import { EN_ProjectLocation } from "src/projectLocation/entity/projectLocation.entity";

@Module({
  controllers: [UploadController],
  providers: [UploadService, S3Service],
  imports: [
    TypeOrmModule.forFeature([
      EN_Upload,
      EN_Project,
      EN_AboutUs,
      EN_Customer,
      EN_HomePage,
      EN_NewsBlogs,
      EN_OfficeLocation,
      EN_ProjectLocation,
    ]),
  ],
})
export class UploadModule {}
