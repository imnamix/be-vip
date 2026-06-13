import { HomePageDTO } from "./entity/homepage.dto";
import { HomePageService } from "./homepage.service";
import { DeleteHomeDTO } from "./entity/deleteHome.dto";
export declare class HomePageController {
    homePageService: HomePageService;
    constructor(homePageService: HomePageService);
    create(payload: HomePageDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAll(page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<any>;
    updateData(payload: HomePageDTO, id: number): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deleteHomeData(id: DeleteHomeDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
