import { ApiProperty } from "@nestjs/swagger";
import { achievementType, status } from "../../global/system.enums";
import { IsEnum } from "class-validator";

export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}

export class Achievement {
  @ApiProperty()
  title: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  image: MediaItem;
}

export class WhyChooseUsItem {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  icon: string;
}

export class AboutusDTO {
  id: number;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  businessDescription: string;

  @ApiProperty({ type: [MediaItem] })
  media: MediaItem[];

  @ApiProperty({ type: [MediaItem] })
  image: MediaItem[];

  @ApiProperty()
  mission: string;

  @ApiProperty()
  vision: string;

  @ApiProperty()
  ourValue: string;

  @ApiProperty({ type: [WhyChooseUsItem] })
  whyChooseUs: WhyChooseUsItem[];

  @ApiProperty({ type: [MediaItem] })
  homepageAboutUsBgImage: MediaItem[];

  @ApiProperty()
  bannerTitle: string;

  @ApiProperty()
  bannerDescription: string;

  @ApiProperty({ type: [Achievement] })
  achievements: Achievement[];

  @ApiProperty({ enum: achievementType })
  @IsEnum(achievementType)
  type: achievementType;

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
