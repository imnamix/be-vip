import { ApiProperty } from "@nestjs/swagger";

export class SlideItemDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  image?: string;
}

export class EventBannerDTO {
  @ApiProperty({ type: [SlideItemDTO] })
  slides: SlideItemDTO[];
}
