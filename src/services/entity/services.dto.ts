import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ServicesDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false, default: "service" })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bgImage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bannerTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bannerDescription?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  status?: number;
}
