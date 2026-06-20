import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { status } from "../../global/system.enums";
import { Address, BannerSlide, SocialLinks, WorkingHours } from "./contact.dto";

@Entity("contact")
export class EN_Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [BannerSlide] })
  @Column({ type: "json", nullable: true, default: null })
  bannerSlides: BannerSlide[];

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  contactNumber: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  whatsappNumber: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  officeEmail: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  alternateOfficeEmail: string;

  @ApiProperty({ type: () => Address })
  @Column({ type: "json", nullable: true, default: null })
  address: Address;

  @ApiProperty({ type: () => WorkingHours })
  @Column({ type: "json", nullable: true, default: null })
  workingHours: WorkingHours;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  gstNumber: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  googleMapLink: string;

  @ApiProperty({ type: () => SocialLinks })
  @Column({ type: "json", nullable: true, default: null })
  socialLinks: SocialLinks;

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
