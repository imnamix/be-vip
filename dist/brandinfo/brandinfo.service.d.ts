import { EN_BrandInfo } from "./entity/brandinfo.entity";
import { Repository } from "typeorm";
import { BrandInfoDTO } from "./entity/brandinfo.dto";
export declare class BrandInfoService {
    private readonly brandinfoRepo;
    constructor(brandinfoRepo: Repository<EN_BrandInfo>);
    create(obj: BrandInfoDTO): Promise<any>;
    get(): Promise<{
        success: boolean;
        message: string;
        data: EN_BrandInfo;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(obj: BrandInfoDTO): Promise<{
        success: boolean;
        message: string;
        data: EN_BrandInfo;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
