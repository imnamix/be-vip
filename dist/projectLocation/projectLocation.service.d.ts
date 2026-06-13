import { Repository } from "typeorm";
import { EN_ProjectLocation } from "./entity/projectLocation.entity";
import { ProjectLocationDTO } from "./entity/projectLocation.dto";
export declare class ProjectLocationService {
    private readonly projectLocationRepo;
    constructor(projectLocationRepo: Repository<EN_ProjectLocation>);
    create(obj: ProjectLocationDTO): Promise<any>;
    getAllProjectLocations(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    getProjectLocById(id: number): Promise<any>;
    updateProjectLocation(id: number, obj: ProjectLocationDTO): Promise<any>;
    deleteProjectLocation(id: number[]): Promise<any>;
}
