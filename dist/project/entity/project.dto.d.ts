import { status, projectType } from "../../global/system.enums";
export declare class MediaItem {
    media_url: string;
    media_type: string;
}
export declare class DataType {
    title: string;
    content: string;
}
export declare class projectWalkthrough extends DataType {
    youtubeLink: string;
}
export declare class PricingTableItem {
    configuration: string;
    carpetArea: string;
    priceStart: string;
    unitPlan: MediaItem[];
}
export declare class availableOptions extends DataType {
    pricingTable: PricingTableItem[];
}
export declare class ProjectDTO {
    id: number;
    type: projectType;
    name: string;
    reraId: string;
    headline: string;
    subHeadline: string;
    tagline: string;
    projectOverviewSection: DataType[];
    locationAdvantage: DataType[];
    projectWalkthrough: projectWalkthrough[];
    availableOptions: availableOptions[];
    projectSpecification: DataType[];
    amenities: DataType[];
    gallery: MediaItem[];
    description: string;
    media: MediaItem[];
    masterPlan: MediaItem[];
    floorPlan: MediaItem[];
    location: string;
    status: status;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
