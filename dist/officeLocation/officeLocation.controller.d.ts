import { OfficeLocationService } from "./officeLocation.service";
import { OfficeLocationDTO } from "./entity/officeLocation.dto";
import { deleteLocDTO } from "./entity/deleteLoc.dto";
export declare class OfficeLocationController {
    officeLocService: OfficeLocationService;
    constructor(officeLocService: OfficeLocationService);
    createOfficeLoc(obj: OfficeLocationDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAllOffLoc(page: number, limit: number, search: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getLocById(id: number): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    updateOffLoc(id: number, payload: OfficeLocationDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deleteOffLoc(deleteDTO: deleteLocDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
