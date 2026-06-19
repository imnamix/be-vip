import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { EN_Role } from "./role.entity";
import { permissions } from "../../global/system.enums";

@Entity("permission")
export class EN_Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: permissions,
  })
  permission: permissions;

  @ManyToMany(() => EN_Role, (role) => role.permissions)
  roles: EN_Role[];

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
