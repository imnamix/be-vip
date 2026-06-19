import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString } from "class-validator";

export class GalleryDTO {
  @ApiProperty({ required: false, enum: ["image", "video"], default: "image" })
  @IsOptional()
  @IsString()
  @IsIn(["image", "video"])
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, enum: ["event", "numerologist", "testimonials", "others"], default: "others" })
  @IsOptional()
  @IsString()
  @IsIn(["event", "numerologist", "testimonials", "others"])
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  status?: number;
}
