import { WorkIndustryDTO } from "./entity/workIndustry.dto";
import { WorkIndustryService } from "./workIndustry.service";
import { DeleteWorkIndustryDTO } from "./entity/deleteWorkIndustry.dto";
export declare class WorkIndustryController {
    workIndustryService: WorkIndustryService;
    constructor(workIndustryService: WorkIndustryService);
    create(payload: WorkIndustryDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAll(page?: number, limit?: number, search?: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    update(payload: WorkIndustryDTO, id: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    delete(payload: DeleteWorkIndustryDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
