import { ApiProperty, PartialType, OmitType } from "@nestjs/swagger";
import { UserDTO } from "./user.dto";

export class UpdateUserDTO extends OmitType(UserDTO, [
  "password",
  "otp",
  "otpExpiresAt",
] as const) {}
