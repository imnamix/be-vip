import { EN_Role } from "./role.entity";
import { gender, status } from "../../global/system.enums";
export declare class EN_User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: gender;
    role: EN_Role;
    status: status;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
    otp: number;
    otpExpiresAt: Date;
}
