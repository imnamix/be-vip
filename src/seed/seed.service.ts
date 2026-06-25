import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EN_User } from '../user/entity/user.entity';
import { EN_AdminRole } from '../roles/entity/role.entity';
import { gender, status } from '../global/system.enums';

const ALL_TRUE = { read: true, write: true, update: true, delete: true };

const SUPER_ADMIN_PERMISSIONS: Record<string, { read: boolean; write: boolean; update: boolean; delete: boolean }> = {
  Dashboard:        ALL_TRUE,
  Inquiry:          ALL_TRUE,
  'General Inquiry': ALL_TRUE,
  Events:           ALL_TRUE,
  'Top VIP Numbers': ALL_TRUE,
  Content:          ALL_TRUE,
  Roles:            ALL_TRUE,
  Users:            ALL_TRUE,
  Delivery:         ALL_TRUE,
  Settings:         ALL_TRUE,
};

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_AdminRole)
    private readonly roleRepo: Repository<EN_AdminRole>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedSuperAdminRole();
    await this.seedAdminUser();
  }

  private async seedSuperAdminRole() {
    const existing = await this.roleRepo.findOne({ where: { name: 'Super Admin' } });

    if (!existing) {
      await this.roleRepo.save(
        this.roleRepo.create({
          name:        'Super Admin',
          badge:       'SA',
          description: 'Full access to all modules and settings',
          permissions: SUPER_ADMIN_PERMISSIONS,
        }),
      );
      this.logger.log('Seeded role: Super Admin with all permissions');
    } else {
      existing.permissions = SUPER_ADMIN_PERMISSIONS;
      await this.roleRepo.save(existing);
      this.logger.log('Super Admin role already exists — permissions synced');
    }
  }

  private async seedAdminUser() {
    const email    = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name     = process.env.ADMIN_NAME || 'Super Admin';
    const phone    = process.env.ADMIN_PHONE || '0000000000';

    if (!email || !password) {
      this.logger.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set in .env — skipping admin user seed.');
      return;
    }

    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      this.logger.log(`Admin user already exists: ${email}`);
      return;
    }

    const superAdminRole = await this.roleRepo.findOne({ where: { name: 'Super Admin' } });
    if (!superAdminRole) {
      this.logger.error('Super Admin role not found — cannot seed admin user.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepo.save(
      this.userRepo.create({
        name,
        email,
        password: hashedPassword,
        phone,
        gender:   gender.MALE,
        status:   status.ACTIVE,
        role:     superAdminRole,
        roleName: superAdminRole.name,
      }),
    );

    this.logger.log(`Admin user seeded: ${email}`);
  }
}
