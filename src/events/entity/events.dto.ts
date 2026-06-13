import { ApiProperty } from "@nestjs/swagger";
import { eventType, status, formType } from "../../global/system.enums";
import { IsEnum } from "class-validator";

export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}

export class EventsDTO {
  id: number;

  @ApiProperty({ enum: formType })
  @IsEnum(formType)
  formType: formType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  eventDate: string;

  @ApiProperty()
  eventTime: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ enum: eventType })
  @IsEnum(eventType)
  eventType: eventType;

  @ApiProperty({ type: [MediaItem] })
  mainImage: MediaItem[];

  @ApiProperty({ type: [MediaItem] })
  galleryImages: MediaItem[];

  @ApiProperty({ type: [MediaItem] })
  video: MediaItem[];

  @ApiProperty()
  bannerTitle: string;

  @ApiProperty()
  bannerDescription: string;

  @ApiProperty({ type: [MediaItem] })
  bannerImage: MediaItem[];

  @ApiProperty({ enum: status })
  @IsEnum(status)
  status: status;

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  updated_by: number;
}

export class DeleteEventDTO {
  ids: number[];
}
