import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("whatsapp_settings")
export class EN_WhatsappSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  appId: string;

  @ApiProperty()
  @Column({ type: "text", nullable: true, default: null })
  appSecret: string;

  @ApiProperty()
  @Column({ type: "text", nullable: true, default: null })
  accessToken: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  verifyToken: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  phoneNumberId: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  businessAccountId: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  webhookUrl: string;

  @ApiProperty()
  @Column({ type: "boolean", default: false })
  isActive: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
