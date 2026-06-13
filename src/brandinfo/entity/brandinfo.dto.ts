import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class BrandInfoDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand_logo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  favicon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meta_title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meta_description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meta_keyword?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  og_image_url?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  status?: number;
}
