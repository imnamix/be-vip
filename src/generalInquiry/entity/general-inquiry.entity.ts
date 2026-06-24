import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("general_inquiry")
export class EN_GeneralInquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, nullable: false })
  mobile: string;

  @ApiProperty()
  @Column({ type: "longtext", nullable: true, default: null })
  message: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  lookingFor: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: true, default: "Pending" })
  status: string;

  @ApiProperty()
  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
