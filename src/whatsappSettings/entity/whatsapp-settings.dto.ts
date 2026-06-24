import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class WhatsappSettingsDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  appId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  appSecret?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  verifyToken?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumberId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  businessAccountId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  webhookUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
