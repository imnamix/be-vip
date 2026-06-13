import { UserDTO } from "./user.dto";
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Omit<UserDTO, "password" | "otp" | "otpExpiresAt">>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
}
export {};
