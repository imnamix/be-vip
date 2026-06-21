import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("vip_numbers")
export class EN_VipNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  icon: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, nullable: true, default: null })
  vipNumber: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  category: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true, default: null })
  price: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  tag: string;

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
