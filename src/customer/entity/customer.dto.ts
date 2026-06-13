import { ApiProperty } from "@nestjs/swagger";
import { customerType, status } from "../../global/system.enums";
import { IsEnum } from "class-validator";

export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}
export class CustomerDTO {
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [MediaItem] })
  media: MediaItem[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  feedback: string;

  @ApiProperty({ enum: status })
  @IsEnum(status)
  status: status;

  @ApiProperty({ enum: customerType })
  @IsEnum(customerType)
  type: customerType;

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;
  @ApiProperty()
  updated_by: number;
}
