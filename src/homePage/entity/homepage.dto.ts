import { ApiProperty } from "@nestjs/swagger";

export class SlideItem {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  image?: string;
}

export class StatItem {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: number;

  @ApiProperty({ required: false })
  icon?: string;
}

export class HomePageDTO {
  id: number;

  @ApiProperty({ type: [StatItem] })
  stats: StatItem[];

  @ApiProperty({ type: [SlideItem] })
  slides: SlideItem[];

  @ApiProperty({ required: false })
  footer_bg_image?: string;

  @ApiProperty({ required: false })
  contactus_bg_image?: string;

  @ApiProperty({ required: false })
  aboutus_bg_image?: string;

  @ApiProperty({ required: false })
  services_bg_image?: string;

  @ApiProperty({ required: false })
  projects_bg_image?: string;

  @ApiProperty({ required: false })
  events_bg_image?: string;

  @ApiProperty({ required: false })
  home_contact_bg_image?: string;

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  updated_by: number;
}
