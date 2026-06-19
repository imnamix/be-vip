import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { EN_PlanCategory } from "../../plancategory/entity/planCategory.entity";

@Entity("plans")
export class EN_Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 50, nullable: false })
  type: string; // "Plan" or "Banner"

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true })
  banner_name: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true })
  banner_description: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true })
  banner_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true })
  plan_image: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true })
  video_title: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true })
  video_description: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true })
  video_link: string;

  @ApiProperty()
  @Column({ type: "int", nullable: true })
  plan_category_id: number;

  @ManyToOne(() => EN_PlanCategory, { eager: true })
  @JoinColumn({ name: "plan_category_id" })
  plan_category: EN_PlanCategory;

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
