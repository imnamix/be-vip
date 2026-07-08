import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_EventRegistration } from "./entity/event-registration.entity";
import { EN_Events } from "../events/entity/events.entity";
import { CreateEventRegistrationDTO } from "./entity/event-registration.dto";

@Injectable()
export class EventRegistrationService {
  constructor(
    @InjectRepository(EN_EventRegistration)
    private readonly repo: Repository<EN_EventRegistration>,
    @InjectRepository(EN_Events)
    private readonly eventsRepo: Repository<EN_Events>,
  ) {}

  async create(dto: CreateEventRegistrationDTO) {
    try {
      const event = await this.eventsRepo.findOne({ where: { id: dto.eventId } });
      if (!event) {
        return { success: false, message: "Event not found." };
      }

      const registration = this.repo.create({
        event,
        name: dto.name,
        mobile: dto.mobile,
        address: dto.address ?? null,
      });
      const data = await this.repo.save(registration);
      return { success: true, message: "Registered for event successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while registering for event.", error };
    }
  }

  async getByEvent(eventId: number) {
    try {
      const data = await this.repo.find({
        where: { event: { id: eventId } },
        order: { created_at: "DESC" },
      });
      return { success: true, message: "Registrations fetched successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while fetching registrations.", error };
    }
  }

  async updateStatus(id: number, status: string) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `Registration ${id} not found.` };
      item.status = status;
      const data = await this.repo.save(item);
      return { success: true, message: "Registration status updated successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while updating registration status.", error };
    }
  }
}
