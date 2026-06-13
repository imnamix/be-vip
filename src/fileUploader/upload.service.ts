import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { Repository } from "typeorm";
import { EN_Upload } from "./fileUpload.entity";
import { S3Service } from "./s3.service";
import { extname } from "path";
import * as sharp from "sharp";
import { MODULE } from "../global/system.enums";
import { EN_Project } from "../project/entity/project.entity";
import { EN_OfficeLocation } from "../officeLocation/entity/officeLocation.entity";
import { EN_NewsBlogs } from "../newsAndBlogs/entity/newsBlogs.entity";
import { EN_HomePage } from "../homePage/entity/homepage.entity";
import { EN_Customer } from "../customer/entity/customer.entity";
import { EN_AboutUs } from "../aboutus/entity/aboutus.entity";
import { EN_ProjectLocation } from "src/projectLocation/entity/projectLocation.entity";
@Injectable()
export class UploadService {
  private s3: AWS.S3;
  private readonly bucketName = process.env.BUCKET_NAME;
  private readonly cdn_key = process.env.CDN_URL;
  constructor(
    @InjectRepository(EN_Upload)
    private readonly fileUploadRepo: Repository<EN_Upload>,
    private readonly s3service: S3Service,
    @InjectRepository(EN_Project)
    private readonly projectRepo: Repository<EN_Project>,
    @InjectRepository(EN_ProjectLocation)
    private readonly plantLocRepo: Repository<EN_ProjectLocation>,
    @InjectRepository(EN_OfficeLocation)
    private readonly officeLocRepo: Repository<EN_OfficeLocation>,
    @InjectRepository(EN_NewsBlogs)
    private readonly newsBlogRepo: Repository<EN_NewsBlogs>,
    @InjectRepository(EN_HomePage)
    private readonly homepageRepo: Repository<EN_HomePage>,
    @InjectRepository(EN_Customer)
    private readonly customersRepo: Repository<EN_Customer>,
    @InjectRepository(EN_AboutUs)
    private readonly aboutUsRepo: Repository<EN_AboutUs>,
  ) {
    this.s3 = new AWS.S3({
      // endpoint: new AWS.Endpoint(AWS_ENDPOINT.KEY), //not needed for aws it is included for wasabi
      region: process.env.BUCKET_REGION,
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_SECRET_KEY,
    });

    if (!this.bucketName) {
      throw new Error("Bucket name is not defined in environment variables");
    }
  }
  async uploadToWasabi(file: Express.Multer.File, entityName?: string) {
    const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const folderPath = entityName ? `gallery/${entityName}/` : "gallery/";
    const fileExtension = extname(file.originalname);
    const fileNameWithoutExt = randomName;
    const fullPath = `${folderPath}${fileNameWithoutExt}${fileExtension}`;
    const thumbnailPath = `${folderPath}thumbnails/${fileNameWithoutExt}_thumb${fileExtension}`;

    try {
      let uploadPromises: Promise<any>[] = [];
      let thumbnailUrl = null;

      // Upload original file
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucketName,
        Key: fullPath,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      uploadPromises.push(this.s3.upload(params).promise());

      // Generate and upload thumbnail for images only
      if (file.mimetype.startsWith("image/")) {
        try {
          const thumbnailBuffer = await sharp(file.buffer)
            .resize(400, 300, {
              fit: "cover",
              position: "center",
            })
            .toBuffer();

          const thumbnailParams: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: thumbnailPath,
            Body: thumbnailBuffer,
            ContentType: file.mimetype,
          };
          uploadPromises.push(this.s3.upload(thumbnailParams).promise());
        } catch (error) {
          console.error("Error generating thumbnail:", error);
          // Continue upload without thumbnail if generation fails
        }
      }

      const results = await Promise.all(uploadPromises);
      const originalResult = results[0];

      if (!originalResult) {
        throw new HttpException(
          "File upload failed: No response from Amazon S3",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const access_url = `${this.cdn_key}/${fullPath}`;
      if (results.length > 1) {
        thumbnailUrl = `${this.cdn_key}/${thumbnailPath}`;
      }

      return {
        originalName: file.originalname,
        filename: fullPath,
        fileType: file.mimetype,
        size: file.size,
        access_url: access_url,
        thumbnail_url: thumbnailUrl,
        date: new Date(),
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new HttpException(
        "Failed to upload file to Amazon S3",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSignedUrl(filepath: string) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: filepath,
        Expires: 43200, //12 hrs
      };
      return await this.s3.getSignedUrlPromise("getObject", params);
    } catch (error) {
      return error;
    }
  }

  async deleteFile(filepath: string, moduleName: MODULE, id: number) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: filepath,
      };
      if (!filepath) {
        return { success: false, message: "File Path Not Fond" };
      }
      let repository;
      switch (moduleName) {
        case MODULE.PROJECT:
          repository = this.projectRepo;
          break;
        case MODULE.PLANT_LOCATION:
          repository = this.plantLocRepo;
          break;
        case MODULE.OFFICE_LOCATION:
          repository = this.officeLocRepo;
          break;
        case MODULE.NEWS_BLOGS:
          repository = this.newsBlogRepo;
          break;
        case MODULE.HOMEPAGE:
          repository = this.homepageRepo;
          break;
        case MODULE.CUSTOMERS:
          repository = this.customersRepo;
          break;
        case MODULE.ABOUT_US:
          repository = this.aboutUsRepo;
          break;
      }

      const entity = await repository.findOne({ where: { id: id } });
      if (!entity) {
        throw new HttpException(
          `${moduleName} entity not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      let fileExists = false; //check if filepath exist in db or not
      if (Array.isArray(entity.media)) {
        entity.media = entity.media.filter((img) => {
          if (img?.media_url?.includes(filepath)) {
            fileExists = true;
            return false; //it will remove file if condition satisfy
          }
          return true; //it will keeps file
        });
      }

      if (!fileExists) {
        await this.s3.deleteObject(params).promise();
        return { success: true, message: "File deleted successfully" };
      } else {
        await repository.save(entity);
        await this.s3.deleteObject(params).promise();
        return { success: true, message: "File deleted successfully" };
      }
    } catch (error) {
      return error;
    }
  }
}
