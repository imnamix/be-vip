import { EN_Services } from "./entity/services.entity";
import { Repository } from "typeorm";
import { ServicesDTO } from "./entity/services.dto";
export declare class ServicesService {
    private readonly servicesRepo;
    constructor(servicesRepo: Repository<EN_Services>);
    create(obj: ServicesDTO): Promise<any>;
    getAll(skip?: number, take?: number, searchKey?: string): Promise<{
        success: boolean;
        message: string;
        data: EN_Services[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    getById(id: number): Promise<{
        success: boolean;
        message: string;
        data: EN_Services;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, obj: ServicesDTO): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: EN_Services;
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
