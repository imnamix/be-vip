import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { achievementType, status } from "../../global/system.enums";
import { MediaItem } from "./aboutus.dto";

@Entity("aboutus")
export class EN_AboutUs {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  businessName: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  businessDescription: string;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: achievementType,
    default: achievementType.PHOTO,
  })
  type: achievementType;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  media: MediaItem[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  image: MediaItem[];

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  mission: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  vision: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  ourValue: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  whyChooseUs: WhyChooseUsItem[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  homepageAboutUsBgImage: MediaItem[];

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  bannerTitle: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  bannerDescription: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  achievements: Achievement[];

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

export interface Achievement {
  title: string;
  year: number;
  image: MediaItem;
}

export interface WhyChooseUsItem {
  key: string;
  value: string;
  icon: string;
}
