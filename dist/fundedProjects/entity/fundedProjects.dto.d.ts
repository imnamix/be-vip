export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class FundedProjectsDTO {
    id: number;
    title: string;
    description: string;
    type: string;
    media: MediaItem[];
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
export declare class DeleteFundedProjectsDTO {
    ids: number[];
}
