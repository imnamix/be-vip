import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_ServicePage } from "./entity/service-page.entity";
import { ServicePageDTO } from "./entity/service-page.dto";

@Injectable()
export class ServicePageService {
  constructor(
    @InjectRepository(EN_ServicePage)
    private readonly repo: Repository<EN_ServicePage>,
  ) {}

  async createOrUpdate(dto: ServicePageDTO) {
    try {
      const existing = await this.repo.findOne({ where: {} });
      if (existing) {
        Object.assign(existing, dto);
        const data = await this.repo.save(existing);
        return { success: true, message: "Service page updated successfully.", data };
      } else {
        const item = this.repo.create(dto);
        const data = await this.repo.save(item);
        return { success: true, message: "Service page created successfully.", data };
      }
    } catch (error) {
      return { success: false, message: "Error while saving service page.", error };
    }
  }

  async get() {
    try {
      const data = await this.repo.findOne({ where: {} });
      return { success: true, message: "Service page fetched successfully.", data: data ?? null };
    } catch (error) {
      return { success: false, message: "Error while fetching service page.", error };
    }
  }
}
