import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';
import { EN_User } from './entity/user.entity';
import { EN_AdminRole } from '../roles/entity/role.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EN_User, EN_AdminRole]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
