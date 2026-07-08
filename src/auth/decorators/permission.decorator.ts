import { SetMetadata } from '@nestjs/common';
import { PermissionAction } from '../interfaces/permission.interface';

export const PERMISSION_KEY = 'rbac_permission';

export interface PermissionRequirement {
  module: string | string[];
  action: PermissionAction;
}

/**
 * Usage: @Permission("Events", "delete")
 * Pass an array to allow any one of several modules to satisfy the check —
 * e.g. @Permission(["Inquiry", "Delivery"], "read") for endpoints shared
 * between two admin pages that each carry their own permission.
 * Requires @UseGuards(AuthGuard, PermissionGuard) on the class or method.
 */
export const Permission = (module: string | string[], action: PermissionAction) =>
  SetMetadata(PERMISSION_KEY, { module, action } satisfies PermissionRequirement);
