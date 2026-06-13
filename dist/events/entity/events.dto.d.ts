import { eventType, status, formType } from "../../global/system.enums";
export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class EventsDTO {
    id: number;
    formType: formType;
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
    eventType: eventType;
    mainImage: MediaItem[];
    galleryImages: MediaItem[];
    video: MediaItem[];
    bannerTitle: string;
    bannerDescription: string;
    bannerImage: MediaItem[];
    status: status;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
export declare class DeleteEventDTO {
    ids: number[];
}
