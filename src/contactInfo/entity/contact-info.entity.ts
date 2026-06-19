import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contact_info")
export class EN_ContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  title: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: false })
  phone: string;

  @ApiProperty()
  @Column({ type: "text", nullable: false })
  address: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  linkedin: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  facebook: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  instagram: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  youtube: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  whatsapp: string;

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
