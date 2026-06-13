import { BrandInfoDTO } from "./entity/brandinfo.dto";
import { BrandInfoService } from "./brandinfo.service";
export declare class BrandInfoController {
    brandinfoService: BrandInfoService;
    constructor(brandinfoService: BrandInfoService);
    createOrUpdate(payload: BrandInfoDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    get(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/brandinfo.entity").EN_BrandInfo;
    }>;
    update(payload: BrandInfoDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/brandinfo.entity").EN_BrandInfo;
    }>;
}
