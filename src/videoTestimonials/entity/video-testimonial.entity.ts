import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("video_testimonials")
export class EN_VideoTestimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  videoUrl: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255 })
  name: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  role: string;

  @ApiProperty()
  @Column({ type: "text", nullable: true, default: null })
  review: string;

  @ApiProperty()
  @Column({ type: "tinyint", default: 5 })
  rating: number;

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
