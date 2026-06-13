import { eventType, status, formType } from "../../global/system.enums";
import { MediaItem } from "./events.dto";
export declare class EN_Events {
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
