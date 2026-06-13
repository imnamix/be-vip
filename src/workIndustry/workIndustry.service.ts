import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_WorkIndustry } from "./entity/workIndustry.entity";
import { In, Repository } from "typeorm";
import { WorkIndustryDTO } from "./entity/workIndustry.dto";

@Injectable()
export class WorkIndustryService {
  constructor(
    @InjectRepository(EN_WorkIndustry)
    private readonly workIndustryRepo: Repository<EN_WorkIndustry>,
  ) {}

  async createWorkIndustry(payload: WorkIndustryDTO) {
    try {
      const newWorkIndustry = this.workIndustryRepo.create(payload);
      return await this.workIndustryRepo.save(newWorkIndustry);
    } catch (error) {
      return error;
    }
  }

  async getAllWorkIndustryData(
    pagination: { page: number; limit: number },
    search?: string,
  ) {
    try {
      const { page, limit } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      let query = this.workIndustryRepo.createQueryBuilder("work_industry");

      if (search) {
        query = query.where(
          "work_industry.title LIKE :search OR work_industry.description LIKE :search",
          { search: `%${search}%` },
        );
      }

      const [data, total] = await query
        .orderBy("work_industry.created_at", "DESC")
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getWorkIndustryById(id: number) {
    try {
      const data = await this.workIndustryRepo.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateWorkIndustry(payload: WorkIndustryDTO, id: number) {
    try {
      const updatedWorkIndustry = await this.workIndustryRepo.update(
        { id: id },
        payload,
      );
      return updatedWorkIndustry;
    } catch (error) {
      return error;
    }
  }

  async deleteWorkIndustry(ids: number[]) {
    try {
      const deletedWorkIndustry = await this.workIndustryRepo.delete({
        id: In(ids),
      });
      return deletedWorkIndustry;
    } catch (error) {
      return error;
    }
  }
}
