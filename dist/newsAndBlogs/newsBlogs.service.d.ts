import { EN_NewsBlogs } from "./entity/newsBlogs.entity";
import { Repository } from "typeorm";
import { NewsBlogsDTO } from "./entity/newsBlogs.dto";
export declare class NewsBlogsService {
    private readonly newsBlogRepo;
    constructor(newsBlogRepo: Repository<EN_NewsBlogs>);
    createNewsBlog(obj: NewsBlogsDTO): Promise<any>;
    getAllNewsBlogs(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    getAllNewsBlogsById(id: number): Promise<any>;
    updateNewsBlog(id: number, obj: NewsBlogsDTO): Promise<any>;
    deleteNewsBlogs(id: number[]): Promise<any>;
}
