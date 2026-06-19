import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class MediaItem {
  media_url: string;
  media_type: string;
}

@Entity("funded_projects")
export class EN_FundedProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: "text", nullable: false })
  description: string;

  @ApiProperty()
  @Column({
    type: "varchar",
    length: 50,
    nullable: true,
    default: "home-finance",
  })
  type: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true })
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
