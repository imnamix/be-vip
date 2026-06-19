import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("services")
export class EN_Services {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  title: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, default: "service" })
  type: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  bgImage: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  bannerTitle: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  bannerDescription: string;

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
