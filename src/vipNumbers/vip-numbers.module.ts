import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_VipNumber } from "./entity/vip-numbers.entity";
import { VipNumbersService } from "./vip-numbers.service";
import { VipNumbersController } from "./vip-numbers.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_VipNumber])],
  controllers: [VipNumbersController],
  providers: [VipNumbersService],
})
export class VipNumbersModule {}
