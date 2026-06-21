import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { EN_VipNumber } from "./entity/vip-numbers.entity";
import { VipNumbersDTO } from "./entity/vip-numbers.dto";

@Injectable()
export class VipNumbersService {
  constructor(
    @InjectRepository(EN_VipNumber)
    private readonly repo: Repository<EN_VipNumber>,
  ) {}

  async create(dto: VipNumbersDTO) {
    try {
      const item = this.repo.create(dto);
      const data = await this.repo.save(item);
      return { success: true, message: "VIP number created successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while creating VIP number.", error };
    }
  }

  async getAll(page = 1, limit = 10, search = "", category = "") {
    try {
      const skip = (page - 1) * limit;
      const where: any = {};
      if (search) where.vipNumber = Like(`%${search}%`);
      if (category && category !== "All") where.category = category;

      const [data, count] = await this.repo.findAndCount({
        take: limit,
        skip,
        where: Object.keys(where).length ? where : undefined,
        order: { created_at: "DESC" },
      });
      return { success: true, message: "VIP numbers fetched successfully.", data, count };
    } catch (error) {
      return { success: false, message: "Error while fetching VIP numbers.", error };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) return { success: false, message: `VIP number with id ${id} not found.` };
      return { success: true, message: "VIP number fetched successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while fetching VIP number.", error };
    }
  }

  async update(id: number, dto: VipNumbersDTO) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `VIP number with id ${id} not found.` };
      this.repo.merge(item, dto);
      const data = await this.repo.save(item);
      return { success: true, message: "VIP number updated successfully.", data };
    } catch (error) {
      return { success: false, message: "Error while updating VIP number.", error };
    }
  }

  async delete(id: number) {
    try {
      const item = await this.repo.findOne({ where: { id } });
      if (!item) return { success: false, message: `VIP number with id ${id} not found.` };
      await this.repo.remove(item);
      return { success: true, message: "VIP number deleted successfully." };
    } catch (error) {
      return { success: false, message: "Error while deleting VIP number.", error };
    }
  }
}
