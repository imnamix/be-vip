import { status } from "../../global/system.enums";
export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class SlideItem {
    title: string;
    description: string;
    image: string;
}
export declare class OfficeLocationDTO {
    id: number;
    infoType: string;
    officeNumber: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    workingHours: string;
    country: string;
    postalCode: string;
    googleMapLink: string;
    officePhone: string;
    officeEmail: string;
    status: status;
    media: MediaItem[];
    slides?: SlideItem[];
    googleEmbedLink: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
