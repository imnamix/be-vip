import { SessionService } from "../shared/services/session.service";
export declare class FileEntity {
    entityName: string;
    entityId: string;
}
export declare class FileUploaderController {
    private ss;
    constructor(ss: SessionService);
    upload(file: any, createCatDto: FileEntity): Promise<any>;
    serveAvatar(entityName: any, entityId: any, res: any): Promise<any>;
    upload2(file: any, query: any, createCatDto: FileEntity): Promise<{
        success: boolean;
        path: string;
    }>;
    serveAvatar2(query: any, res: any): Promise<any>;
    upload4(files: any, query: any, SessionService: any, createCatDto: FileEntity): Promise<{
        success: boolean;
        files: any[];
    }>;
    uploadS3(files: any, req: any): Promise<{
        success: boolean;
        files: any[];
    }>;
    getS3Url(query: any, res: any): Promise<any>;
}
