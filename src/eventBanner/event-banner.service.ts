import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_EventBanner } from "./entity/event-banner.entity";
import { EventBannerDTO } from "./entity/event-banner.dto";

@Injectable()
export class EventBannerService {
  constructor(
    @InjectRepository(EN_EventBanner)
    private readonly repo: Repository<EN_EventBanner>,
  ) {}

  async createOrUpdate(dto: EventBannerDTO) {
    try {
      const existing = await this.repo.findOne({ where: {} });
      if (existing) {
        Object.assign(existing, dto);
        const data = await this.repo.save(existing);
        return { success: true, message: "Event banner updated successfully.", data };
      } else {
        const item = this.repo.create(dto);
        const data = await this.repo.save(item);
        return { success: true, message: "Event banner created successfully.", data };
      }
    } catch (error) {
      return { success: false, message: "Error while saving event banner.", error };
    }
  }

  async get() {
    try {
      const data = await this.repo.findOne({ where: {} });
      return { success: true, message: "Event banner fetched successfully.", data: data ?? null };
    } catch (error) {
      return { success: false, message: "Error while fetching event banner.", error };
    }
  }
}
