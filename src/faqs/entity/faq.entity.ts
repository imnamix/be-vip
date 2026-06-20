import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("faqs")
export class EN_Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "text" })
  question: string;

  @ApiProperty()
  @Column({ type: "text" })
  answer: string;

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
