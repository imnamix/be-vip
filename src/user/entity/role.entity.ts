import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { userRoles } from "../../global/system.enums";
import { ApiProperty } from "@nestjs/swagger";
import { EN_Permission } from "./permission.entity";
import { EN_User } from "./user.entity";

@Entity("role")
export class EN_Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: userRoles,
    default: userRoles.USER,
  })
  role: userRoles;

  @OneToMany(() => EN_User, (user) => user.role)
  users: EN_User[];

  @ManyToMany(() => EN_Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: EN_Permission[];

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
