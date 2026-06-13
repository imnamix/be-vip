import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../shared/shared.module";
import { EN_ProjectLocation } from "./entity/projectLocation.entity";
import { ProjectLocationController } from "./projectLocation.controller";
import { ProjectLocationService } from "./projectLocation.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_ProjectLocation]), SharedModule],
  controllers: [ProjectLocationController],
  providers: [ProjectLocationService],
})
export class ProjectLocationModule {}
