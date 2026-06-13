import { achievementType, status } from "../../global/system.enums";
export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class Achievement {
    title: string;
    year: number;
    image: MediaItem;
}
export declare class WhyChooseUsItem {
    key: string;
    value: string;
    icon: string;
}
export declare class AboutusDTO {
    id: number;
    businessName: string;
    businessDescription: string;
    media: MediaItem[];
    image: MediaItem[];
    mission: string;
    vision: string;
    ourValue: string;
    whyChooseUs: WhyChooseUsItem[];
    homepageAboutUsBgImage: MediaItem[];
    bannerTitle: string;
    bannerDescription: string;
    achievements: Achievement[];
    type: achievementType;
    status: status;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
