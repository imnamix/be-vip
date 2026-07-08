import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { EN_Events } from "../../events/entity/events.entity";

@Entity("event_registration")
export class EN_EventRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EN_Events, { nullable: false, eager: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "event_id" })
  event: EN_Events;

  @ApiProperty()
  @Column({ type: "varchar", length: 255 })
  name: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 15 })
  mobile: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 500, nullable: true, default: null })
  address: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20, default: "Registered" })
  status: string;

  @ApiProperty()
  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
