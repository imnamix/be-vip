import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_ServicePage } from "./entity/service-page.entity";
import { ServicePageService } from "./service-page.service";
import { ServicePageController } from "./service-page.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_ServicePage])],
  controllers: [ServicePageController],
  providers: [ServicePageService],
})
export class ServicePageModule {}
