import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("admin_role")
export class EN_AdminRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100, nullable: true, default: null })
  badge: string;

  @Column({ length: 500, nullable: true, default: null })
  description: string;

  @Column({ type: "json", nullable: true, default: null })
  permissions: Record<string, { read: boolean; write: boolean; update: boolean; delete: boolean }>;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
