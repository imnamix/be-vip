import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_WhatsappSettings } from "./entity/whatsapp-settings.entity";
import { WhatsappSettingsDTO } from "./entity/whatsapp-settings.dto";

@Injectable()
export class WhatsappSettingsService {
  constructor(
    @InjectRepository(EN_WhatsappSettings)
    private readonly repo: Repository<EN_WhatsappSettings>
  ) {}

  async get() {
    const record = await this.repo.findOne({ where: { id: 1 } });
    return record ?? {};
  }

  async save(payload: WhatsappSettingsDTO) {
    const existing = await this.repo.findOne({ where: { id: 1 } });
    if (existing) {
      await this.repo.update(existing.id, payload);
      return this.repo.findOne({ where: { id: existing.id } });
    }
    const record = this.repo.create(payload);
    return this.repo.save(record);
  }
}
