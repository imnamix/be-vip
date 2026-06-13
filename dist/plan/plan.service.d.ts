import { EN_Plan } from "./entity/plan.entity";
import { Repository } from "typeorm";
import { PlanDTO } from "./entity/plan.dto";
export declare class PlanService {
    private readonly planRepo;
    constructor(planRepo: Repository<EN_Plan>);
    create(obj: PlanDTO): Promise<{
        success: boolean;
        message: string;
        data: EN_Plan;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAll(): Promise<{
        success: boolean;
        message: string;
        data: EN_Plan[];
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
        data: EN_Plan;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, obj: PlanDTO): Promise<{
        success: boolean;
        message: string;
        data: EN_Plan;
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
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
