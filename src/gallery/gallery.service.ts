import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EN_Gallery } from "./entity/gallery.entity";
import { GalleryDTO } from "./entity/gallery.dto";

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(EN_Gallery)
    private readonly galleryRepo: Repository<EN_Gallery>,
  ) {}

  async create(obj: GalleryDTO) {
    try {
      const newData = this.galleryRepo.create(obj);
      return await this.galleryRepo.save(newData);
    } catch (error) {
      return error;
    }
  }

  async getAll(skip: number = 0, take: number = 1000, searchKey: string = "") {
    try {
      let query = this.galleryRepo
        .createQueryBuilder("gallery")
        .where("gallery.status = :status", { status: 1 });

      if (searchKey && searchKey.trim()) {
        query = query.andWhere(
          "(gallery.title LIKE :searchKey OR gallery.category LIKE :searchKey OR gallery.type LIKE :searchKey)",
          { searchKey: `%${searchKey}%` },
        );
      }

      const [data, total] = await query
        .orderBy("gallery.created_at", "ASC")
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return {
        success: true,
        message: "Gallery items fetched successfully",
        data,
        total,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching gallery items",
        error,
      };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.galleryRepo.findOne({ where: { id, status: 1 } });
      if (!data) {
        return { success: false, message: `Gallery item with id ${id} not found`, data: null };
      }
      return { success: true, message: "Gallery item fetched successfully", data };
    } catch (error) {
      return { success: false, message: "Error while fetching gallery item", error };
    }
  }

  async update(id: number, obj: GalleryDTO) {
    try {
      const item = await this.galleryRepo.findOne({ where: { id } });
      if (!item) {
        return { success: false, message: `Gallery item with id ${id} not found` };
      }
      Object.assign(item, obj);
      const updated = await this.galleryRepo.save(item);
      return { success: true, message: "Gallery item updated successfully", data: updated };
    } catch (error) {
      return { success: false, message: "Error while updating gallery item", error };
    }
  }

  async delete(id: number) {
    try {
      const item = await this.galleryRepo.findOne({ where: { id } });
      if (!item) {
        return { success: false, message: `Gallery item with id ${id} not found` };
      }
      await this.galleryRepo.remove(item);
      return { success: true, message: "Gallery item deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error while deleting gallery item", error };
    }
  }
}
