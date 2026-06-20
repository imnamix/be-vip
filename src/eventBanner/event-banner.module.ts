import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_EventBanner } from "./entity/event-banner.entity";
import { EventBannerService } from "./event-banner.service";
import { EventBannerController } from "./event-banner.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_EventBanner])],
  controllers: [EventBannerController],
  providers: [EventBannerService],
})
export class EventBannerModule {}
