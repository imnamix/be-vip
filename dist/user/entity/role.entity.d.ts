import { userRoles } from "../../global/system.enums";
import { EN_Permission } from "./permission.entity";
import { EN_User } from "./user.entity";
export declare class EN_Role {
    id: number;
    role: userRoles;
    users: EN_User[];
    permissions: EN_Permission[];
    created_at: Date;
    updated_at: Date;
}
