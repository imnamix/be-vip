import { ApiProperty } from "@nestjs/swagger";

export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}

export class FundedProjectsDTO {
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    enum: ["home-finance", "banking-finance", "industry-finance", "others"],
  })
  type: string;

  @ApiProperty({ type: [MediaItem], nullable: true })
  media: MediaItem[];

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  updated_by: number;
}

export class DeleteFundedProjectsDTO {
  @ApiProperty({ type: [Number] })
  ids: number[];
}
