import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EN_User } from '../../user/entity/user.entity';
import { EN_AdminRole } from '../../roles/entity/role.entity';
import { status } from '../../global/system.enums';
import {
  PermissionAction,
  PermissionCheckResult,
  PermissionsMap,
} from '../interfaces/permission.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_AdminRole)
    private readonly roleRepo: Repository<EN_AdminRole>,
  ) {}

  /**
   * Single method that covers every backend RBAC check:
   *  1. User existence
   *  2. User status (ACCOUNT_DISABLED)
   *  3. Permission version comparison (returns PERMISSION_UPDATED when stale)
   *  4. Specific module+action permission check
   *
   * Pass module/action as null for auth-only routes (status check only).
   */
  async check(
    userId: number,
    roleId: number | null,
    clientVersion: string | undefined,
    module: string | null,
    action: PermissionAction | null,
  ): Promise<PermissionCheckResult> {
    const [user, role] = await Promise.all([
      this.userRepo.findOne({
        where: { id: userId },
        select: { id: true, status: true },
      }),
      roleId
        ? this.roleRepo.findOne({ where: { id: roleId } })
        : Promise.resolve(null),
    ]);

    if (!user) {
      return { allowed: false };
    }

    if (user.status !== status.ACTIVE) {
      return { allowed: false, userStatus: 'ACCOUNT_DISABLED' };
    }

    // Auth-only route — no module/action to check
    if (!module || !action) {
      return { allowed: true };
    }

    const freshVersion = role?.updated_at?.toISOString() ?? null;

    // Client has a cached version that no longer matches the DB
    if (clientVersion && freshVersion && clientVersion !== freshVersion) {
      return {
        allowed: false,
        permissionsUpdated: true,
        freshPermissions: (role?.permissions ?? {}) as PermissionsMap,
        freshVersion,
      };
    }

    const permissions: PermissionsMap = (role?.permissions ?? {}) as PermissionsMap;
    const hasPermission = permissions[module]?.[action] === true;

    return { allowed: hasPermission };
  }
}
