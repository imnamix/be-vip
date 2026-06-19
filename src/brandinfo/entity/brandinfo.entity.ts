import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("brandinfo")
export class EN_BrandInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  brand_logo: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  favicon: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  company_name: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  tagline: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, nullable: true, default: null })
  phone: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  email: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  address: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  gst: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  meta_title: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  meta_description: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  meta_keyword: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  og_image: string;

  @ApiProperty()
  @Column({ type: "tinyint", default: 1 })
  status: number;

  @ApiProperty()
  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
