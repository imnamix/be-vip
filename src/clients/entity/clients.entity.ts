import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MediaItem } from "./clients.dto";

@Entity("clients")
export class EN_Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: false })
  clientName: string;

  @ApiProperty()
  @Column({ type: "text", nullable: false })
  description: string;

  @ApiProperty()
  @Column({ type: "json" })
  media: MediaItem[];

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
