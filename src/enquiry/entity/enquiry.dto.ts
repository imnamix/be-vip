import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";

export class EnquiryDTO {
  id: number;

  @ApiProperty()
  name: string;

  // @ApiProperty()
  // email: string;

  @ApiProperty()
  mobile: string;

  // @ApiProperty()
  // location: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: [String] })
  lookingFor: string[];

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;
  @ApiProperty()
  updated_by: number;
}

export class DeleteEnquiryDTO {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  ids?: number[];
}
