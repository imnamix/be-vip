import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.gaurd';

/**
 * Same token validation as AuthGuard, except a missing Authorization header
 * is treated as an anonymous request instead of a 401 — for routes that
 * serve both the public website and the admin panel (e.g. content/catalog
 * reads). When a token IS present it's validated exactly as strictly as
 * AuthGuard (still 401s on an invalid/expired one), so an authenticated
 * admin's request.user gets populated and PermissionGuard can run its
 * permission-version check on it.
 */
@Injectable()
export class OptionalAuthGuard extends AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request?.headers?.authorization) return true;
    return super.canActivate(context);
  }
}
