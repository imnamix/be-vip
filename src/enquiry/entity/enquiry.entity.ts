import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("enquiry")
export class EN_Enquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  name: string;

  // @ApiProperty()
  // @Column({ type: "varchar", length: 255, nullable: true, default: null })
  // email: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  mobile: string;

  // @ApiProperty()
  // @Column({ type: "varchar", length: 255, nullable: true, default: null })
  // location: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  message: string;

  @ApiProperty()
  @Column({ type: "json", nullable: true, default: null })
  lookingFor: string[];

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
