import { NewsBlogsService } from "./newsBlogs.service";
import { NewsBlogsDTO } from "./entity/newsBlogs.dto";
import { DeleteNewsDTO } from "./entity/deleteNews.dto";
export declare class NewsBlogsController {
    newsBlogsService: NewsBlogsService;
    constructor(newsBlogsService: NewsBlogsService);
    create(obj: NewsBlogsDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAll(page: number, limit: number, search: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    updateNewsBlog(id: number, data: NewsBlogsDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deleteNewsBlog(id: DeleteNewsDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
