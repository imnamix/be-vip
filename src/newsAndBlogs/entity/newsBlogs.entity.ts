import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { productType, status } from "../../global/system.enums";
import { ApiProperty } from "@nestjs/swagger";
import { MediaItem } from "../../project/entity/project.dto";

@Entity("newsAndBlogs")
export class EN_NewsBlogs {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 700, nullable: true, default: null })
  author: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 1000, nullable: true, default: null })
  headline: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  description: string;

  @ApiProperty()
  @Column({ type: "enum", enum: productType, default: productType.NEWS })
  type: productType;

  @ApiProperty()
  @Column({ type: "enum", enum: status, default: status.ACTIVE })
  status: status;

  @ApiProperty()
  @Column({ type: "boolean", default: false })
  isPublished: boolean;

  @ApiProperty()
  @Column({ type: "datetime" })
  issueDate: Date;

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
