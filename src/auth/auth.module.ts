import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './guards/role.gaurd';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '7d' },
      }),
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
