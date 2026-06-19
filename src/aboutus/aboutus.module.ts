import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_AboutUs } from "./entity/aboutus.entity";
import { AboutusController } from "./aboutus.controller";
import { AboutUsService } from "./aboutus.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_AboutUs])],
  controllers: [AboutusController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
