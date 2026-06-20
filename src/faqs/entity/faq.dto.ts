import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FaqDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty({ default: 1 })
  @IsOptional()
  @IsInt()
  status?: number;
}
