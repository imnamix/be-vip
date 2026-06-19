import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_PlanCategory } from "./entity/planCategory.entity";
import { PlanCategoryController } from "./planCategory.controller";
import { PlanCategoryService } from "./planCategory.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_PlanCategory])],
  controllers: [PlanCategoryController],
  providers: [PlanCategoryService],
})
export class PlanCategoryModule {}
