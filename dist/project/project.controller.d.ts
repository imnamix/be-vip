import { ProjectService } from "./project.service";
import { ProjectDTO } from "./entity/project.dto";
import { DeleteProjectDTO } from "./entity/deleteProject.dto";
export declare class ProjectController {
    projectService: ProjectService;
    constructor(projectService: ProjectService);
    create(projectObj: ProjectDTO): Promise<{
        succcess: boolean;
        message: string;
        data: any;
    }>;
    getAllProjects(page?: number, limit?: number, search?: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getProjectById(id: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateProject(id: number, projectObj: ProjectDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    deleteProject(delteDTO: DeleteProjectDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
