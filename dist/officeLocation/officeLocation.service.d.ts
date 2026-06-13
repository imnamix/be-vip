import { EN_OfficeLocation } from "./entity/officeLocation.entity";
import { Repository } from "typeorm";
import { OfficeLocationDTO } from "./entity/officeLocation.dto";
export declare class OfficeLocationService {
    private readonly plantLocationRepo;
    constructor(plantLocationRepo: Repository<EN_OfficeLocation>);
    create(obj: OfficeLocationDTO): Promise<any>;
    getAllOfficeLoc(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    getLocById(id: number): Promise<any>;
    updateOfficeLocation(id: number, payload: OfficeLocationDTO): Promise<any>;
    deleteOffceLoc(id: number[]): Promise<any>;
}
