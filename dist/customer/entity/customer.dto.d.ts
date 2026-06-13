import { customerType, status } from "../../global/system.enums";
export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class CustomerDTO {
    id: number;
    name: string;
    media: MediaItem[];
    description: string;
    feedback: string;
    status: status;
    type: customerType;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
