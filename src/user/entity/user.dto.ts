import { ApiProperty } from "@nestjs/swagger";
import { gender, status } from "../../global/system.enums";
import { IsEnum, IsOptional, IsNumber } from "class-validator";

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

  @ApiProperty({ example: 1, required: false, description: "Role ID from admin_role table" })
  @IsOptional()
  @IsNumber()
  role: number;

  @ApiProperty({ example: "Sales Executive", required: false })
  roleName: string;

  @ApiProperty({ required: false })
  profilePicture: string;

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
