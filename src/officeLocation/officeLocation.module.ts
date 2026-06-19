import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_OfficeLocation } from "./entity/officeLocation.entity";
import { OfficeLocationController } from "./officeLocation.controller";
import { OfficeLocationService } from "./officeLocation.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_OfficeLocation])],
  controllers: [OfficeLocationController],
  providers: [OfficeLocationService],
})
export class OfficeLocationModule {}
