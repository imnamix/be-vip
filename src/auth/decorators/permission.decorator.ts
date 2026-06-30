import { SetMetadata } from '@nestjs/common';
import { PermissionAction } from '../interfaces/permission.interface';

export const PERMISSION_KEY = 'rbac_permission';

export interface PermissionRequirement {
  module: string;
  action: PermissionAction;
}

/**
 * Usage: @Permission("Events", "delete")
 * Requires @UseGuards(AuthGuard, PermissionGuard) on the class or method.
 */
export const Permission = (module: string, action: PermissionAction) =>
  SetMetadata(PERMISSION_KEY, { module, action } satisfies PermissionRequirement);
