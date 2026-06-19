import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Events } from "./entity/events.entity";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Events])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
