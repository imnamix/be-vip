import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Plan } from "./entity/plan.entity";
import { PlanService } from "./plan.service";
import { PlanController } from "./plan.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Plan])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
