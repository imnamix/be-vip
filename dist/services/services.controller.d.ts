import { ServicesDTO } from "./entity/services.dto";
import { ServicesService } from "./services.service";
export declare class ServicesController {
    servicesService: ServicesService;
    constructor(servicesService: ServicesService);
    create(payload: ServicesDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/services.entity").EN_Services[];
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
        data: import("./entity/services.entity").EN_Services;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, payload: ServicesDTO): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: import("./entity/services.entity").EN_Services;
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
