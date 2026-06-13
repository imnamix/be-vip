import { EN_WorkIndustry } from "./entity/workIndustry.entity";
import { Repository } from "typeorm";
import { WorkIndustryDTO } from "./entity/workIndustry.dto";
export declare class WorkIndustryService {
    private readonly workIndustryRepo;
    constructor(workIndustryRepo: Repository<EN_WorkIndustry>);
    createWorkIndustry(payload: WorkIndustryDTO): Promise<any>;
    getAllWorkIndustryData(pagination: {
        page: number;
        limit: number;
    }, search?: string): Promise<any>;
    getWorkIndustryById(id: number): Promise<any>;
    updateWorkIndustry(payload: WorkIndustryDTO, id: number): Promise<any>;
    deleteWorkIndustry(ids: number[]): Promise<any>;
}
