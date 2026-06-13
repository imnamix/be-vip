import { gender, status, userRoles } from "../../global/system.enums";
export declare class UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: gender;
    role: userRoles;
    status: status;
    otp: number;
    otpExpiresAt: Date;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
