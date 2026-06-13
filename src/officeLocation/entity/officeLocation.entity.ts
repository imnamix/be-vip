import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { status } from "../../global/system.enums";
import { MediaItem } from "./officeLocation.dto";

@Entity("officeLocation")
export class EN_OfficeLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, nullable: true, default: "CONTACT" })
  infoType: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 700, nullable: true, default: null })
  officeNumber: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 700, nullable: true, default: null })
  street: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 700, nullable: true, default: null })
  landmark: string;

  @ApiProperty()
  @Column({ type: "varchar", nullable: true, default: null })
  city: string;

  @ApiProperty()
  @Column({ type: "varchar", nullable: true, default: null })
  state: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  workingHours: string;
  
  @ApiProperty()
  @Column({ type: "varchar", nullable: true, default: null })
  country: string;

  @ApiProperty()
  @Column({ type: "varchar", nullable: true, default: null })
  postalCode: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  googleMapLink: string;

  @ApiProperty()
  @Column({ length: 15, nullable: true, default: null })
  officePhone: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  officeEmail: string;

  @ApiProperty()
  @Column({ type: "enum", enum: status, default: "ACTIVE" })
  status: status;

  @ApiProperty()
  @Column({ type: "json" })
  media: MediaItem[];

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  slides: any[];

  @ApiProperty()
  @Column({ type: "varchar", length: 2000, nullable: true, default: null })
  googleEmbedLink: string;

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
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  whatsapp: string;

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
