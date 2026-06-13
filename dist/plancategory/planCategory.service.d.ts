import { EN_PlanCategory } from "./entity/planCategory.entity";
import { Repository } from "typeorm";
import { PlanCategoryDTO } from "./entity/planCategory.dto";
export declare class PlanCategoryService {
    private readonly planCategoryRepo;
    constructor(planCategoryRepo: Repository<EN_PlanCategory>);
    create(obj: PlanCategoryDTO): Promise<{
        success: boolean;
        message: string;
        data: EN_PlanCategory;
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
        data: EN_PlanCategory[];
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
        data: EN_PlanCategory;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, obj: PlanCategoryDTO): Promise<{
        success: boolean;
        message: string;
        data: EN_PlanCategory;
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
