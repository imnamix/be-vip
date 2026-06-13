import { productType, status } from "../../global/system.enums";
import { MediaItem } from "../../project/entity/project.dto";
export declare class EN_NewsBlogs {
    id: number;
    author: string;
    headline: string;
    description: string;
    type: productType;
    status: status;
    isPublished: boolean;
    issueDate: Date;
    media: MediaItem[];
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
