import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Project } from "./entity/project.entity";
import { SharedModule } from "../shared/shared.module";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Project]), SharedModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
