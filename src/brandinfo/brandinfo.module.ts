import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_BrandInfo } from "./entity/brandinfo.entity";
import { BrandInfoController } from "./brandinfo.controller";
import { BrandInfoService } from "./brandinfo.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_BrandInfo])],
  controllers: [BrandInfoController],
  providers: [BrandInfoService],
})
export class BrandInfoModule {}
