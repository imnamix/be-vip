import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SlideItem, StatItem } from "./homepage.dto";

@Entity("homepage")
export class EN_HomePage {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [StatItem] })
  @Column({ type: "json", nullable: true })
  stats: { key: string; value: number; icon?: string }[];

  @ApiProperty({ type: [SlideItem] })
  @Column({ type: "json", nullable: true })
  slides: { title: string; description: string; image?: string }[];

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  footer_bg_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  contactus_bg_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  aboutus_bg_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  services_bg_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  projects_bg_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  events_bg_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  home_contact_bg_image: string;

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
