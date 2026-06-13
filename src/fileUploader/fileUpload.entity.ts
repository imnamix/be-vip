import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("fileUpload")
export class EN_Upload {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty()
  @Column({ type: "varchar", length: 255 })
  originalName: string; // Original file name

  @Column({ type: "varchar", length: 1000 })
  filename: string; // File name with path in Wasabi

  @Column({ type: "varchar", length: 255 })
  fileType: string; // MIME type (e.g., image/jpeg, application/pdf)

  @Column({ type: "bigint" })
  size: number; // File size in bytes

  @Column({ type: "varchar", length: 1000 })
  accessUrl: string; // Public URL to access the file in Wasabi

  @Column({ type: "varchar", length: 255, nullable: true })
  entityName: string; // Optional field to categorize files (e.g., "profile_pictures")

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: null, nullable: true })
  created_by: number;

  @Column({ default: null, nullable: true })
  updated_by: number;
}
