import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_VideoTestimonial } from "./entity/video-testimonial.entity";
import { VideoTestimonialDTO } from "./entity/video-testimonial.dto";

@Injectable()
export class VideoTestimonialsService {
  constructor(
    @InjectRepository(EN_VideoTestimonial)
    private readonly repo: Repository<EN_VideoTestimonial>,
  ) {}

  async create(dto: VideoTestimonialDTO) {
    try {
      const item = this.repo.create(dto);
      const data = await this.repo.save(item);
      return { success: true, message: "Video testimonial created successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while creating video testimonial.", error };
    }
  }

  async getAll(skip = 0, take = 1000, search = "") {
    try {
      let query = this.repo
        .createQueryBuilder("vt")
        .where("vt.status = :status", { status: 1 });

      if (search?.trim()) {
        query = query.andWhere(
          "(vt.name LIKE :s OR vt.role LIKE :s OR vt.review LIKE :s)",
          { s: `%${search}%` },
        );
      }

      const [data, total] = await query
        .orderBy("vt.created_at", "ASC")
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { success: true, message: "Video testimonials fetched successfully.", data, total };
    } catch (error) {
      return { success: false, message: "Error while fetching video testimonials.", error };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id, status: 1 } });
      if (!data) return { success: false, message: `Video testimonial ${id} not found.`, data: null };
      return { success: true, message: "Video testimonial fetched successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while fetching video testimonial.", error };
    }
  }

  async update(id: number, dto: VideoTestimonialDTO) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `Video testimonial ${id} not found.` };
      Object.assign(item, dto);
      const data = await this.repo.save(item);
      return { success: true, message: "Video testimonial updated successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while updating video testimonial.", error };
    }
  }

  async delete(id: number) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `Video testimonial ${id} not found.` };
      await this.repo.remove(item);
      return { success: true, message: "Video testimonial deleted successfully." };
    } catch (error) {
      return { success: false, message: "Error while deleting video testimonial.", error };
    }
  }
}
