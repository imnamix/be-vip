import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("event_banner")
export class EN_EventBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "json", nullable: true })
  slides: { title: string; description: string; image?: string }[];

  @ApiProperty()
  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
