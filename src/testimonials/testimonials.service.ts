import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_Testimonial } from "./entity/testimonial.entity";
import { TestimonialDTO } from "./entity/testimonial.dto";

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(EN_Testimonial)
    private readonly repo: Repository<EN_Testimonial>,
  ) {}

  async create(dto: TestimonialDTO) {
    try {
      const item = this.repo.create(dto);
      const data = await this.repo.save(item);
      return { success: true, message: "Testimonial created successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while creating testimonial.", error };
    }
  }

  async getAll(skip = 0, take = 1000, search = "") {
    try {
      let query = this.repo
        .createQueryBuilder("t")
        .where("t.status = :status", { status: 1 });

      if (search?.trim()) {
        query = query.andWhere(
          "(t.name LIKE :s OR t.role LIKE :s OR t.review LIKE :s)",
          { s: `%${search}%` },
        );
      }

      const [data, total] = await query
        .orderBy("t.created_at", "ASC")
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { success: true, message: "Testimonials fetched successfully.", data, total };
    } catch (error) {
      return { success: false, message: "Error while fetching testimonials.", error };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id, status: 1 } });
      if (!data) return { success: false, message: `Testimonial ${id} not found.`, data: null };
      return { success: true, message: "Testimonial fetched successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while fetching testimonial.", error };
    }
  }

  async update(id: number, dto: TestimonialDTO) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `Testimonial ${id} not found.` };
      Object.assign(item, dto);
      const data = await this.repo.save(item);
      return { success: true, message: "Testimonial updated successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while updating testimonial.", error };
    }
  }

  async delete(id: number) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `Testimonial ${id} not found.` };
      await this.repo.remove(item);
      return { success: true, message: "Testimonial deleted successfully." };
    } catch (error) {
      return { success: false, message: "Error while deleting testimonial.", error };
    }
  }
}
