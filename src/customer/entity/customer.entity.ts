import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { customerType, status } from "../../global/system.enums";
import { MediaItem } from "./customer.dto";

@Entity("customer")
export class EN_Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  name: string;

  @ApiProperty()
  @Column({ type: "json" })
  media: MediaItem[];

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 3000, nullable: true, default: null })
  feedback: string;

  @ApiProperty()
  @Column({ type: "enum", enum: status, default: status.ACTIVE })
  status: status;

  @ApiProperty()
  @Column({ type: "enum", enum: customerType, default: customerType.FEEDBACK })
  type: customerType;

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
