import { achievementType, status } from "../../global/system.enums";
import { MediaItem } from "./aboutus.dto";
export declare class EN_AboutUs {
    id: number;
    businessName: string;
    businessDescription: string;
    type: achievementType;
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
    status: status;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
export interface Achievement {
    title: string;
    year: number;
    image: MediaItem;
}
export interface WhyChooseUsItem {
    key: string;
    value: string;
    icon: string;
}
