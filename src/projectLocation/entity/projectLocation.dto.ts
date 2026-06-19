import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsEnum } from "class-validator";
import { projectStatus, projectType, status } from "../../global/system.enums";
export class MediaItem {
  @ApiProperty()
  media_url: string;

  @ApiProperty()
  media_type: string;
}
export class ProjectLocationDTO {
  id: number;

  @ApiProperty()
  projectName: string;

  @ApiProperty()
  headline: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  projectStatus: projectStatus;

  @ApiProperty()
  projectType: projectType;

  @ApiProperty()
  reraId: string;

  @ApiProperty({ enum: status })
  @IsEnum(status)
  status: status;

  @ApiProperty({ type: [MediaItem] })
  media: MediaItem[];

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  updated_by: number;
}
