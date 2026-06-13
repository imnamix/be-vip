import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Services } from "./entity/services.entity";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Services])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
