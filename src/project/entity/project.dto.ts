import { ApiProperty } from "@nestjs/swagger";
import { status, projectType } from "../../global/system.enums";
import { IsEnum } from "class-validator";
export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}

export class DataType {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class projectWalkthrough extends DataType {
  @ApiProperty()
  youtubeLink: string;
}

export class PricingTableItem {
  @ApiProperty()
  configuration: string;

  @ApiProperty()
  carpetArea: string;

  @ApiProperty()
  priceStart: string;

  @ApiProperty({ type: [MediaItem] })
  unitPlan: MediaItem[];
}

export class availableOptions extends DataType {
  @ApiProperty({ type: [PricingTableItem] })
  pricingTable: PricingTableItem[];
}

export class ProjectDTO {
  id: number;

  @ApiProperty({ enum: projectType })
  @IsEnum(projectType)
  type: projectType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  reraId: string;

  @ApiProperty()
  headline: string;

  @ApiProperty()
  subHeadline: string;

  @ApiProperty()
  tagline: string;

  @ApiProperty()
  projectOverviewSection: DataType[];

  @ApiProperty()
  locationAdvantage: DataType[];

  @ApiProperty()
  projectWalkthrough: projectWalkthrough[];

  @ApiProperty()
  availableOptions: availableOptions[];

  @ApiProperty()
  projectSpecification: DataType[];

  @ApiProperty()
  amenities: DataType[];

  @ApiProperty()
  gallery: MediaItem[];

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [MediaItem] })
  media: MediaItem[];

  @ApiProperty({ type: [MediaItem] })
  masterPlan: MediaItem[];

  @ApiProperty({ type: [MediaItem] })
  floorPlan: MediaItem[];

  @ApiProperty()
  location: string;

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
