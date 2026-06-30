import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './guards/auth.gaurd';
import { PermissionGuard } from './guards/permission.guard';
import { PermissionService } from './services/permission.service';
import { EN_User } from '../user/entity/user.entity';
import { EN_AdminRole } from '../roles/entity/role.entity';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([EN_User, EN_AdminRole]),
  ],
  providers: [JwtStrategy, AuthGuard, PermissionGuard, PermissionService],
  exports: [
    PassportModule,
    JwtModule,
    AuthGuard,
    PermissionGuard,
    PermissionService,
  ],
})
export class AuthModule {}
