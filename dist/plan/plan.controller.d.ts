import { PlanDTO } from "./entity/plan.dto";
import { PlanService } from "./plan.service";
export declare class PlanController {
    planService: PlanService;
    constructor(planService: PlanService);
    create(payload: PlanDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/plan.entity").EN_Plan;
    }>;
    getAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/plan.entity").EN_Plan[];
    }>;
    getById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/plan.entity").EN_Plan;
    }>;
    update(id: number, payload: PlanDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/plan.entity").EN_Plan;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
