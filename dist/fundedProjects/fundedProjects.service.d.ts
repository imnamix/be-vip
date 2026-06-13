import { EN_FundedProject } from "./entity/fundedProjects.entity";
import { Repository } from "typeorm";
import { FundedProjectsDTO } from "./entity/fundedProjects.dto";
export declare class FundedProjectsService {
    private readonly fundedProjectsRepo;
    constructor(fundedProjectsRepo: Repository<EN_FundedProject>);
    createFundedProject(payload: FundedProjectsDTO): Promise<any>;
    getAllFundedProjectsData(pagination: {
        page: number;
        limit: number;
    }, search?: string): Promise<any>;
    getFundedProjectById(id: number): Promise<any>;
    updateFundedProject(payload: FundedProjectsDTO, id: number): Promise<any>;
    deleteFundedProject(ids: number[]): Promise<any>;
}
