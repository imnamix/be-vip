import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './guards/role.gaurd';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [],
  providers: [JwtStrategy,{
    provide: 'APP_GUARD',
    useClass: RoleGuard,
  },],
  exports: [PassportModule],
})
export class AuthModule {}
