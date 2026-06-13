import { Repository } from "typeorm";
import { EN_Upload } from "./fileUpload.entity";
import { S3Service } from "./s3.service";
import { MODULE } from "../global/system.enums";
import { EN_Project } from "../project/entity/project.entity";
import { EN_OfficeLocation } from "../officeLocation/entity/officeLocation.entity";
import { EN_NewsBlogs } from "../newsAndBlogs/entity/newsBlogs.entity";
import { EN_HomePage } from "../homePage/entity/homepage.entity";
import { EN_Customer } from "../customer/entity/customer.entity";
import { EN_AboutUs } from "../aboutus/entity/aboutus.entity";
import { EN_ProjectLocation } from "src/projectLocation/entity/projectLocation.entity";
export declare class UploadService {
    private readonly fileUploadRepo;
    private readonly s3service;
    private readonly projectRepo;
    private readonly plantLocRepo;
    private readonly officeLocRepo;
    private readonly newsBlogRepo;
    private readonly homepageRepo;
    private readonly customersRepo;
    private readonly aboutUsRepo;
    private s3;
    private readonly bucketName;
    private readonly cdn_key;
    constructor(fileUploadRepo: Repository<EN_Upload>, s3service: S3Service, projectRepo: Repository<EN_Project>, plantLocRepo: Repository<EN_ProjectLocation>, officeLocRepo: Repository<EN_OfficeLocation>, newsBlogRepo: Repository<EN_NewsBlogs>, homepageRepo: Repository<EN_HomePage>, customersRepo: Repository<EN_Customer>, aboutUsRepo: Repository<EN_AboutUs>);
    uploadToWasabi(file: Express.Multer.File, entityName?: string): Promise<{
        originalName: string;
        filename: string;
        fileType: string;
        size: number;
        access_url: string;
        thumbnail_url: any;
        date: Date;
    }>;
    getSignedUrl(filepath: string): Promise<any>;
    deleteFile(filepath: string, moduleName: MODULE, id: number): Promise<any>;
}
