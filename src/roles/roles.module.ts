import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_AdminRole } from "./entity/role.entity";
import { EN_User } from "../user/entity/user.entity";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_AdminRole, EN_User])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
