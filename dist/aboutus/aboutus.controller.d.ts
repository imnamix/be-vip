import { AboutusDTO } from "./entity/aboutus.dto";
import { AboutUsService } from "./aboutus.service";
import { DeleteAboutDTO } from "./entity/deleteAbout.dto";
export declare class AboutusController {
    aboutusService: AboutUsService;
    constructor(aboutusService: AboutUsService);
    create(payload: AboutusDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAllData(page: number, limit: number, search: string, status: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<any>;
    updateAboutUs(id: number, payload: AboutusDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deletePlantLoc(id: DeleteAboutDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
