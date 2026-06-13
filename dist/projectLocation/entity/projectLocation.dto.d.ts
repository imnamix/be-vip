import { projectStatus, projectType, status } from "../../global/system.enums";
export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class ProjectLocationDTO {
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
