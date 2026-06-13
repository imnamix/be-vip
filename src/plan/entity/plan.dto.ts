import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, IsIn } from "class-validator";

export class PlanDTO {
  @ApiProperty({ required: true, enum: ["Plan", "Banner"] })
  @IsString()
  @IsIn(["Plan", "Banner"])
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  banner_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  banner_description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  banner_image?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  plan_image?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  video_title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  video_description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  video_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  plan_category_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  status?: number;
}
