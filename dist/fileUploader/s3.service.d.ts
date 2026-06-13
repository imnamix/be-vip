import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { EN_Upload } from './fileUpload.entity';
export declare class S3Service {
    private readonly fileUploadRepo;
    constructor(fileUploadRepo: Repository<EN_Upload>);
    s3Client: AWS.S3;
    uploadParams: any;
    uploadLetterPdf(pdfBuffer: Buffer, details: {
        uId: string;
        letterType: string;
        employeeName: string;
    }): Promise<{
        fileUrl: string;
        key: string;
        bucket: string;
    }>;
    deleteFileFromS3(key: string): Promise<void>;
}
