import { DeleteLocDTO } from "./entity/deleteLoc.dto";
import { ProjectLocationService } from "./projectLocation.service";
import { ProjectLocationDTO } from "./entity/projectLocation.dto";
export declare class ProjectLocationController {
    ProjectLocationService: ProjectLocationService;
    constructor(ProjectLocationService: ProjectLocationService);
    createProjectLocation(obj: ProjectLocationDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    getAllProjectLocation(page: number, limit: number, search: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getProjectById(id: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    }>;
    updateProjectLocation(id: number, obj: ProjectLocationDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deleteProjectLoc(deleteDTo: DeleteLocDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
