import { EN_Role } from "./role.entity";
import { permissions } from "../../global/system.enums";
export declare class EN_Permission {
    id: number;
    permission: permissions;
    roles: EN_Role[];
    created_at: Date;
    updated_at: Date;
}
