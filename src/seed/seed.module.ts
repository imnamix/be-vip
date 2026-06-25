import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EN_User } from '../user/entity/user.entity';
import { EN_AdminRole } from '../roles/entity/role.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([EN_User, EN_AdminRole])],
  providers: [SeedService],
})
export class SeedModule {}
