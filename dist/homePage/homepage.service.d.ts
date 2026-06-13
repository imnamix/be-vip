import { EN_HomePage } from "./entity/homepage.entity";
import { Repository } from "typeorm";
import { HomePageDTO } from "./entity/homepage.dto";
export declare class HomePageService {
    private readonly homePageRepo;
    constructor(homePageRepo: Repository<EN_HomePage>);
    createHomePage(payload: HomePageDTO): Promise<any>;
    getAllHomePageData(pagination: {
        page: number;
        limit: number;
    }): Promise<any>;
    getHomeById(id: number): Promise<any>;
    updateHomePage(id: number, payload: HomePageDTO): Promise<any>;
    deleteHomePage(id: number[]): Promise<any>;
}
