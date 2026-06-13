import { EN_Project } from "./entity/project.entity";
import { Repository } from "typeorm";
import { ProjectDTO } from "./entity/project.dto";
export declare class ProjectService {
    private readonly projectRepo;
    constructor(projectRepo: Repository<EN_Project>);
    createProject(projectObj: ProjectDTO): Promise<any>;
    getAllProjects(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    getProjectById(id: number): Promise<any>;
    updateProject(id: number, updatedData: ProjectDTO): Promise<any>;
    deleteProject(id: number[]): Promise<any>;
}
