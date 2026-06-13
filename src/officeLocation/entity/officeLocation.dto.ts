import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsEnum } from "class-validator";
import { status } from "../../global/system.enums";
export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}

export class SlideItem {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}

export class OfficeLocationDTO {
  id: number;

  @ApiProperty()
  infoType: string;

  @ApiProperty()
  officeNumber: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  landmark: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  workingHours: string;
  
  @ApiProperty()
  country: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  googleMapLink: string;

  @ApiProperty()
  officePhone: string;

  @ApiProperty()
  officeEmail: string;

  @ApiProperty({ enum: status })
  @IsEnum(status)
  status: status;

  @ApiProperty({ type: [MediaItem] })
  media: MediaItem[];

  @ApiProperty({ type: [SlideItem], required: false })
  slides?: SlideItem[];

  @ApiProperty()
  googleEmbedLink: string;

  @ApiProperty()
  linkedin: string;

  @ApiProperty()
  facebook: string;

  @ApiProperty()
  instagram: string;

  @ApiProperty()
  youtube: string;

  @ApiProperty()
  whatsapp: string;

  created_at: Date;

  updated_at: Date;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  updated_by: number;
}
