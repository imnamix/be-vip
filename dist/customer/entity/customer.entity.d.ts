import { customerType, status } from "../../global/system.enums";
import { MediaItem } from "./customer.dto";
export declare class EN_Customer {
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
