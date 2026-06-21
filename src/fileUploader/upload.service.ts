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
  // SVG / GIF / ICO cannot be meaningfully re-encoded by sharp — skip those.
  private readonly NON_OPTIMIZABLE_TYPES = new Set([
    "image/svg+xml",
    "image/gif",
    "image/x-icon",
    "image/vnd.microsoft.icon",
  ]);

  async uploadToWasabi(file: Express.Multer.File, entityName?: string) {
    const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const folderPath = entityName ? `gallery/${entityName}/` : "gallery/";

    const isOptimizable =
      file.mimetype.startsWith("image/") &&
      !this.NON_OPTIMIZABLE_TYPES.has(file.mimetype);

    // ── Step 1: optimise the main image ──────────────────────────────────────
    let uploadBuffer: Buffer = file.buffer;
    let contentType: string = file.mimetype;
    let fileExt: string = extname(file.originalname);

    if (isOptimizable) {
      try {
        uploadBuffer = await sharp(file.buffer)
          .rotate() // auto-correct EXIF orientation
          .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80, effort: 4 })
          .toBuffer();
        fileExt = ".webp";
        contentType = "image/webp";
      } catch (err) {
        console.error("Sharp optimisation failed, uploading original:", err);
        // fall back to original buffer / mime
      }
    }

    const fullPath = `${folderPath}${randomName}${fileExt}`;
    const thumbnailPath = `${folderPath}thumbnails/${randomName}_thumb.webp`;

    try {
      const uploadPromises: Promise<any>[] = [];

      // ── Step 2: upload main (optimised) file ─────────────────────────────
      uploadPromises.push(
        this.s3
          .upload({
            Bucket: this.bucketName,
            Key: fullPath,
            Body: uploadBuffer,
            ContentType: contentType,
          })
          .promise(),
      );

      // ── Step 3: generate & upload WebP thumbnail ──────────────────────────
      if (isOptimizable) {
        try {
          const thumbBuffer = await sharp(file.buffer) // always from original buffer
            .rotate()
            .resize(400, 300, { fit: "cover", position: "center" })
            .webp({ quality: 75, effort: 3 })
            .toBuffer();

          uploadPromises.push(
            this.s3
              .upload({
                Bucket: this.bucketName,
                Key: thumbnailPath,
                Body: thumbBuffer,
                ContentType: "image/webp",
              })
              .promise(),
          );
        } catch (err) {
          console.error("Thumbnail generation failed:", err);
        }
      }

      const results = await Promise.all(uploadPromises);

      if (!results[0]) {
        throw new HttpException(
          "File upload failed: No response from Amazon S3",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const access_url = `${this.cdn_key}/${fullPath}`;
      const thumbnail_url =
        results.length > 1 ? `${this.cdn_key}/${thumbnailPath}` : null;

      return {
        originalName: file.originalname,
        filename: fullPath,
        fileType: contentType,
        size: uploadBuffer.length,
        access_url,
        thumbnail_url,
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
