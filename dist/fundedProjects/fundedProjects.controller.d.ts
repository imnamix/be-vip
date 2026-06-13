import { FundedProjectsDTO, DeleteFundedProjectsDTO } from "./entity/fundedProjects.dto";
import { FundedProjectsService } from "./fundedProjects.service";
export declare class FundedProjectsController {
    fundedProjectsService: FundedProjectsService;
    constructor(fundedProjectsService: FundedProjectsService);
    create(payload: FundedProjectsDTO): Promise<{
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
    update(id: number, payload: FundedProjectsDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    delete(deleteDTO: DeleteFundedProjectsDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
