import { EN_AboutUs } from "./entity/aboutus.entity";
import { Repository } from "typeorm";
import { AboutusDTO } from "./entity/aboutus.dto";
export declare class AboutUsService {
    private readonly aboutusRepo;
    constructor(aboutusRepo: Repository<EN_AboutUs>);
    create(obj: EN_AboutUs): Promise<any>;
    getAboutusData(pagination: {
        page: number;
        limit: number;
        search: string;
        status?: string;
    }): Promise<any>;
    getAboutUsById(id: number): Promise<any>;
    updateAboutusData(id: number, obj: AboutusDTO): Promise<any>;
    deleteAboutus(id: number[]): Promise<any>;
}
