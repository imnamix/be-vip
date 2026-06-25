import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { UserDTO } from "./user.dto";

export class UpdateUserDTO extends OmitType(UserDTO, [
  "password",
  "otp",
  "otpExpiresAt",
] as const) {
  @ApiProperty({ required: false, description: "New password — will be hashed before saving" })
  @IsOptional()
  @IsString()
  password?: string;
}
