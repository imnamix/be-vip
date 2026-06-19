import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { status, projectType } from "../../global/system.enums";
import { ApiProperty } from "@nestjs/swagger";
import {
  availableOptions,
  DataType,
  MediaItem,
  projectWalkthrough,
} from "./project.dto";

@Entity("project")
export class EN_Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: projectType, default: projectType.PROJECT })
  @Column({ type: "enum", enum: projectType, default: projectType.PROJECT })
  type: projectType;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  name: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  reraId: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  headline: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  subHeadline: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  tagline: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  projectOverviewSection: DataType[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  locationAdvantage: DataType[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  projectWalkthrough: projectWalkthrough[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  availableOptions: availableOptions[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  projectSpecification: DataType[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  amenities: DataType[];

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ type: "json" })
  media: MediaItem[];

  @ApiProperty()
  @Column({ type: "json" })
  gallery: MediaItem[];

  @ApiProperty()
  @Column({ type: "json" })
  masterPlan: MediaItem[];

  @ApiProperty()
  @Column({ type: "varchar", length: 2000, nullable: true, default: null })
  location: string;

  @ApiProperty()
  @Column({ type: "json" })
  floorPlan: MediaItem[];

  @ApiProperty()
  @Column({ type: "enum", enum: status, default: status.ACTIVE })
  status: status;

  @ApiProperty()
  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;

  @ApiProperty()
  @Column({ default: null, nullable: true })
  created_by: number;

  @ApiProperty()
  @Column({ default: null, nullable: true })
  updated_by: number;
}
