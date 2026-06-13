import { EN_PlanCategory } from "../../plancategory/entity/planCategory.entity";
export declare class EN_Plan {
    id: number;
    type: string;
    banner_name: string;
    banner_description: string;
    banner_image: string;
    name: string;
    description: string;
    plan_image: string;
    video_title: string;
    video_description: string;
    video_link: string;
    plan_category_id: number;
    plan_category: EN_PlanCategory;
    status: number;
    created_at: Date;
    updated_at: Date;
}
