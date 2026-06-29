import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("enquiry")
export class EN_Enquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  inquiryType: string; // 'customer' | 'numerologist'

  // Primary contact name (customer name or numerologist name)
  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  name: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  mobile: string;

  // Address fields
  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  address: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  taluka: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  district: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  state: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 10, nullable: true, default: null })
  pinCode: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  nearestViStore: string;

  // Requirements
  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  requireDigits: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  notRequireDigits: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  total: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  specialRequirements: string;

  // Customer — numerologist reference fields
  @ApiProperty()
  @Column({ type: "boolean", nullable: true, default: null })
  hasNumerologistRef: boolean;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  numerologistRefName: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  numerologistRefMobile: string;

  // Numerologist inquiry — client details
  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  clientName: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  clientMobile: string;

  // Legacy fields
  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  message: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  lookingFor: string[];

  // Source
  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  source: string;

  // Status
  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: "Pending" })
  status: string;

  // VIP number flag & direct entry
  @ApiProperty()
  @Column({ type: "boolean", nullable: true, default: false })
  isVipNumber: boolean;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, nullable: true, default: null })
  vipNumber: string;

  // VIP number suggestion & confirmation
  @ApiProperty()
  @Column({ type: "text", nullable: true, default: null })
  suggestedNumbers: string; // JSON-encoded SuggestedNumber[]

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  confirmedNumber: string;

  // Activity log & notes (persisted as JSON strings)
  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  activityLog: string; // JSON-encoded TimelineEvent[]

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  enquiryNotes: string; // JSON-encoded Note[]

  // Numerologist commission tracking
  @ApiProperty()
  @Column({ type: "boolean", nullable: true, default: false })
  numerologistCommissionPaid: boolean;

  // Payment proof
  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  paymentProofRef: string; // UTR / transaction reference

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  paymentProofUrl: string; // S3 URL of uploaded proof

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
