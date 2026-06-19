import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("gallery")
export class EN_Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 10, default: "image" })
  type: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  title: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, default: "others" })
  category: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  url: string;

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
