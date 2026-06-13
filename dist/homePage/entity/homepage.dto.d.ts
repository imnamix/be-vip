export declare class SlideItem {
    title: string;
    description: string;
    image?: string;
}
export declare class StatItem {
    key: string;
    value: number;
    icon?: string;
}
export declare class HomePageDTO {
    id: number;
    stats: StatItem[];
    slides: SlideItem[];
    footer_bg_image?: string;
    contactus_bg_image?: string;
    aboutus_bg_image?: string;
    services_bg_image?: string;
    projects_bg_image?: string;
    events_bg_image?: string;
    home_contact_bg_image?: string;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
