export type PermissionAction = 'read' | 'write' | 'update' | 'delete';

export interface ModulePermissions {
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
}

export type PermissionsMap = Record<string, ModulePermissions>;

export interface PermissionCheckResult {
  allowed: boolean;
  userStatus?: 'ACCOUNT_DISABLED';
  permissionsUpdated?: boolean;
  freshPermissions?: PermissionsMap;
  freshVersion?: string;
}
