import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_HomePage } from "./entity/homepage.entity";
import { HomePageController } from "./homepage.controller";
import { HomePageService } from "./homepage.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_HomePage])],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
