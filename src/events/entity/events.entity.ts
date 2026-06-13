import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { eventType, status, formType } from "../../global/system.enums";
import { MediaItem } from "./events.dto";

@Entity("events")
export class EN_Events {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: formType,
    default: formType.EVENT,
  })
  formType: formType;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  title: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ type: "date", nullable: true, default: null })
  eventDate: string;

  @ApiProperty()
  @Column({ type: "time", nullable: true, default: null })
  eventTime: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  location: string;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: eventType,
    default: eventType.SEMINAR,
  })
  eventType: eventType;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  mainImage: MediaItem[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  galleryImages: MediaItem[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  video: MediaItem[];

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  bannerTitle: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  bannerDescription: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  bannerImage: MediaItem[];

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
