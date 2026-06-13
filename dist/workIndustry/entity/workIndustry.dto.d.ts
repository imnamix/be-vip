export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class WorkIndustryDTO {
    id: number;
    title: string;
    description: string;
    media: MediaItem[];
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
