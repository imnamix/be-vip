import { UploadService } from "./upload.service";
import { MODULE } from "../global/system.enums";
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadS3(files: Express.Multer.File[], req: any): Promise<{
        files: ({
            success: boolean;
            data: {
                originalName: string;
                filename: string;
                fileType: string;
                size: number;
                access_url: string;
                thumbnail_url: any;
                date: Date;
            };
        } | {
            success: boolean;
            error: any;
        })[];
    }>;
    getImageFromS3(filePath: string): Promise<any>;
    deleteFile(file: string, moduleName: MODULE, id: number): Promise<{
        success: any;
        message: any;
    }>;
}
