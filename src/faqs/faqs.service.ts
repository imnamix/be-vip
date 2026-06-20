import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_Faq } from "./entity/faq.entity";
import { FaqDTO } from "./entity/faq.dto";

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(EN_Faq)
    private readonly repo: Repository<EN_Faq>,
  ) {}

  async create(dto: FaqDTO) {
    try {
      const item = this.repo.create(dto);
      const data = await this.repo.save(item);
      return { success: true, message: "FAQ created successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while creating FAQ.", error };
    }
  }

  async getAll(skip = 0, take = 1000, search = "") {
    try {
      let query = this.repo
        .createQueryBuilder("f")
        .where("f.status = :status", { status: 1 });

      if (search?.trim()) {
        query = query.andWhere(
          "(f.question LIKE :s OR f.answer LIKE :s)",
          { s: `%${search}%` },
        );
      }

      const [data, total] = await query
        .orderBy("f.created_at", "ASC")
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { success: true, message: "FAQs fetched successfully.", data, total };
    } catch (error) {
      return { success: false, message: "Error while fetching FAQs.", error };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id, status: 1 } });
      if (!data) return { success: false, message: `FAQ ${id} not found.`, data: null };
      return { success: true, message: "FAQ fetched successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while fetching FAQ.", error };
    }
  }

  async update(id: number, dto: FaqDTO) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `FAQ ${id} not found.` };
      Object.assign(item, dto);
      const data = await this.repo.save(item);
      return { success: true, message: "FAQ updated successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while updating FAQ.", error };
    }
  }

  async delete(id: number) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `FAQ ${id} not found.` };
      await this.repo.remove(item);
      return { success: true, message: "FAQ deleted successfully." };
    } catch (error) {
      return { success: false, message: "Error while deleting FAQ.", error };
    }
  }
}
