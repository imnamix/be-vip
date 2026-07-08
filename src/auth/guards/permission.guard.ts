import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  PERMISSION_KEY,
  PermissionRequirement,
} from '../decorators/permission.decorator';
import { PermissionService } from '../services/permission.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload | undefined = request.user;

    // No authenticated user means this is a public route — skip
    if (!user?.userId) return true;

    const requirement = this.reflector.getAllAndOverride<PermissionRequirement | undefined>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const clientVersion = request.headers['x-permission-version'] as string | undefined;

    const result = await this.permissionService.check(
      user.userId,
      user.roleId,
      clientVersion,
      requirement?.module ?? null,
      requirement?.action ?? null,
    );

    if (result.userStatus === 'ACCOUNT_DISABLED') {
      throw new HttpException(
        {
          code: 'ACCOUNT_DISABLED',
          message: 'Your account has been disabled. Please contact the administrator.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (result.permissionsUpdated) {
      throw new HttpException(
        {
          code: 'PERMISSION_UPDATED',
          message: 'Your permissions have been updated. Please retry the request.',
          permissions: result.freshPermissions,
          permissionVersion: result.freshVersion,
        },
        HttpStatus.CONFLICT, // 409
      );
    }

    if (requirement && !result.allowed) {
      const moduleLabel = Array.isArray(requirement.module)
        ? requirement.module.join("' or '")
        : requirement.module;
      throw new HttpException(
        {
          code: 'FORBIDDEN',
          message: `You do not have '${requirement.action}' access to '${moduleLabel}'.`,
        },
        HttpStatus.FORBIDDEN, // 403
      );
    }

    return true;
  }
}
