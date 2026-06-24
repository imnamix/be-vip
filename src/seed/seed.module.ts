import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EN_User } from '../user/entity/user.entity';
import { EN_Role } from '../user/entity/role.entity';
import { EN_Permission } from '../user/entity/permission.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([EN_User, EN_Role, EN_Permission])],
  providers: [SeedService],
})
export class SeedModule {}
