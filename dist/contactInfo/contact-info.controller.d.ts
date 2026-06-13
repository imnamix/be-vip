import { ContactInfoService } from "./contact-info.service";
import { CreateContactInfoDto } from "./dto/create-contact-info.dto";
export declare class ContactInfoController {
    contactInfoService: ContactInfoService;
    constructor(contactInfoService: ContactInfoService);
    create(payload: CreateContactInfoDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAll(status: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/contact-info.entity").EN_ContactInfo[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/contact-info.entity").EN_ContactInfo;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, payload: CreateContactInfoDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: import("./entity/contact-info.entity").EN_ContactInfo & CreateContactInfoDto;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
