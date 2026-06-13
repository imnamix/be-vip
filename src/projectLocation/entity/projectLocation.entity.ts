import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { projectStatus, projectType, status } from "../../global/system.enums";
import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { MediaItem } from "./projectLocation.dto";

@Entity("projectLocation")
export class EN_ProjectLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 700, nullable: true, default: null })
  projectName: string;

  @ApiProperty()
  @Column({ length: 700, nullable: true, default: null })
  headline: string;

  @ApiProperty()
  @Column({ length: 2000, nullable: true, default: null })
  address: string;

  @ApiProperty()
  @Column({ length: 2000, nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ nullable: true, default: projectStatus.ONGOING })
  projectStatus: projectStatus;

  @ApiProperty()
  @Column({ nullable: true, default: projectType.RESIDENTIAL })
  projectType: projectType;

  @ApiProperty()
  @Column({ type: "varchar", length: 700, nullable: true, default: null })
  @Length(1, 700)
  reraId: string;

  @ApiProperty()
  @Column({ type: "enum", enum: status, default: status.ACTIVE })
  status: status;

  @ApiProperty()
  @Column({ type: "json" })
  media: MediaItem[];

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
