import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class SlideItemDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  image?: string;
}

export class ServicePageDTO {
  @ApiProperty({ type: [SlideItemDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlideItemDTO)
  slides?: SlideItemDTO[];
}
