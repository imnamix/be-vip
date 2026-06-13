import { projectStatus, projectType, status } from "../../global/system.enums";
import { MediaItem } from "./projectLocation.dto";
export declare class EN_ProjectLocation {
    id: number;
    projectName: string;
    headline: string;
    address: string;
    description: string;
    projectStatus: projectStatus;
    projectType: projectType;
    reraId: string;
    status: status;
    media: MediaItem[];
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
