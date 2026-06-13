import { ApiProperty } from "@nestjs/swagger";
import { gender, status, userRoles } from "../../global/system.enums";
import { IsEnum } from "class-validator";

export class UserDTO {
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: gender })
  @IsEnum(gender)
  gender: gender;

  @ApiProperty({ enum: userRoles })
  @IsEnum(userRoles)
  role: userRoles;

  @ApiProperty({ enum: status })
  @IsEnum(status)
  status: status;

  otp: number;

  otpExpiresAt: Date;

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;
  @ApiProperty()
  updated_by: number;
}
