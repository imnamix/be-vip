import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EN_User } from '../user/entity/user.entity';
import { EN_Role } from '../user/entity/role.entity';
import { EN_Permission } from '../user/entity/permission.entity';
import { userRoles, permissions, gender, status } from '../global/system.enums';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_Role)
    private readonly roleRepo: Repository<EN_Role>,
    @InjectRepository(EN_Permission)
    private readonly permissionRepo: Repository<EN_Permission>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedPermissions();
    await this.seedRoles();
    await this.seedAdminUser();
  }

  private async seedPermissions() {
    const allPerms = [
      permissions.READ,
      permissions.WRITE,
      permissions.UPDATE,
      permissions.DELETE,
    ];

    for (const perm of allPerms) {
      const exists = await this.permissionRepo.findOne({
        where: { permission: perm },
      });
      if (!exists) {
        await this.permissionRepo.save(
          this.permissionRepo.create({ permission: perm }),
        );
        this.logger.log(`Seeded permission: ${perm}`);
      }
    }
  }

  private async seedRoles() {
    const allRoleEnums = [
      userRoles.SUPER_ADMIN,
      userRoles.OFFICE_ADMIN,
      userRoles.USER,
    ];
    const allPerms = await this.permissionRepo.find();

    for (const roleEnum of allRoleEnums) {
      const exists = await this.roleRepo.findOne({ where: { role: roleEnum } });
      if (!exists) {
        const newRole = this.roleRepo.create({
          role: roleEnum,
          // SUPER_ADMIN gets all permissions; others get none by default
          permissions: roleEnum === userRoles.SUPER_ADMIN ? allPerms : [],
        });
        await this.roleRepo.save(newRole);
        this.logger.log(`Seeded role: ${roleEnum}`);
      }
    }
  }

  private async seedAdminUser() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Super Admin';
    const phone = process.env.ADMIN_PHONE || '0000000000';

    if (!email || !password) {
      this.logger.warn(
        'ADMIN_EMAIL or ADMIN_PASSWORD not set in .env — skipping admin user seed.',
      );
      return;
    }

    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      this.logger.log(`Admin user already exists: ${email}`);
      return;
    }

    const superAdminRole = await this.roleRepo.findOne({
      where: { role: userRoles.SUPER_ADMIN },
      relations: ['permissions'],
    });

    if (!superAdminRole) {
      this.logger.error('SUPER_ADMIN role not found — cannot seed admin user.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      phone,
      gender: gender.MALE,
      status: status.ACTIVE,
      role: superAdminRole,
    });

    await this.userRepo.save(adminUser);
    this.logger.log(`Admin user seeded successfully: ${email}`);
  }
}
