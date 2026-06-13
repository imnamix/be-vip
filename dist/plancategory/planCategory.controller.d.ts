import { PlanCategoryDTO } from "./entity/planCategory.dto";
import { PlanCategoryService } from "./planCategory.service";
export declare class PlanCategoryController {
    planCategoryService: PlanCategoryService;
    constructor(planCategoryService: PlanCategoryService);
    create(payload: PlanCategoryDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/planCategory.entity").EN_PlanCategory;
    }>;
    getAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/planCategory.entity").EN_PlanCategory[];
    }>;
    getById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/planCategory.entity").EN_PlanCategory;
    }>;
    update(id: number, payload: PlanCategoryDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/planCategory.entity").EN_PlanCategory;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
