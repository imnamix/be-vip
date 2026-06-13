import { EN_ContactInfo } from "./entity/contact-info.entity";
import { Repository } from "typeorm";
import { CreateContactInfoDto } from "./dto/create-contact-info.dto";
export declare class ContactInfoService {
    private readonly contactInfoRepo;
    constructor(contactInfoRepo: Repository<EN_ContactInfo>);
    create(obj: CreateContactInfoDto): Promise<any>;
    getAll(status?: string): Promise<{
        success: boolean;
        message: string;
        data: EN_ContactInfo[];
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
        data: EN_ContactInfo;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, obj: CreateContactInfoDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: EN_ContactInfo & CreateContactInfoDto;
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
