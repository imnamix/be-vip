import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_EventRegistration } from "./entity/event-registration.entity";
import { EN_Events } from "../events/entity/events.entity";
import { EventRegistrationController } from "./event-registration.controller";
import { EventRegistrationService } from "./event-registration.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_EventRegistration, EN_Events])],
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService],
})
export class EventRegistrationModule {}
