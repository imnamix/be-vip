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
import { EN_Role } from "./role.entity";
import { gender, status } from "../../global/system.enums";

@Entity("user")
export class EN_User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    length: 500,
    nullable: true,
    default: null,
  })
  name: string;

  @ApiProperty()
  @Column({
    length: 100,
    unique: true,
    nullable: true,
    default: null,
  })
  email: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 255, select: false })
  password: string;

  @ApiProperty()
  @Column({
    length: 10,
    nullable: true,
    default: null,
  })
  phone: string;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: gender,
    default: gender.MALE,
  })
  gender: gender;

  @ManyToOne(() => EN_Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: EN_Role;

  @ApiProperty()
  @Column({ type: "enum", enum: status, default: status.ACTIVE })
  status: status;

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

  @ApiProperty()
  @Column({ type: "integer", select: false, nullable: true, default: null })
  otp: number;

  @ApiProperty()
  @Column({ type: "timestamp", select: false, nullable: true, default: null })
  otpExpiresAt: Date;
}
