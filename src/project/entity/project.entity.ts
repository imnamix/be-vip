import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { status } from "../../global/system.enums";

@Entity("project")
export class EN_Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  title: string;

  @Column({ type: "longtext", nullable: true, default: null })
  description: string;

  @Column({ type: "json", nullable: true, default: null })
  media: { media_url: string; thumbnail_url?: string }[];

  @Column({ type: "enum", enum: status, default: status.ACTIVE })
  status: status;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;

  @Column({ default: null, nullable: true })
  created_by: number;

  @Column({ default: null, nullable: true })
  updated_by: number;
}
