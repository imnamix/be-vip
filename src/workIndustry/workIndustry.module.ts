import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_WorkIndustry } from "./entity/workIndustry.entity";
import { WorkIndustryController } from "./workIndustry.controller";
import { WorkIndustryService } from "./workIndustry.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_WorkIndustry])],
  controllers: [WorkIndustryController],
  providers: [WorkIndustryService],
})
export class WorkIndustryModule {}
