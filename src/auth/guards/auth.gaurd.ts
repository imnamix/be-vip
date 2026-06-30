import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request?.headers?.authorization) {
      throw new HttpException('Authorization header missing', HttpStatus.UNAUTHORIZED);
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  async validateToken(auth: string): Promise<JwtPayload> {
    const [scheme, token] = auth.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new HttpException('Invalid authorization format', HttpStatus.UNAUTHORIZED);
    }
    try {
      return jwt.verify(token, process.env.SECRET) as JwtPayload;
    } catch (err) {
      throw new HttpException(
        'Token error: ' + (err.message || err.name),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
