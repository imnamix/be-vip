import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_FundedProject } from "./entity/fundedProjects.entity";
import { FundedProjectsController } from "./fundedProjects.controller";
import { FundedProjectsService } from "./fundedProjects.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_FundedProject])],
  controllers: [FundedProjectsController],
  providers: [FundedProjectsService],
})
export class FundedProjectsModule {}
