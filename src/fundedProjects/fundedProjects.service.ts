import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_FundedProject } from "./entity/fundedProjects.entity";
import { In, Repository } from "typeorm";
import { FundedProjectsDTO } from "./entity/fundedProjects.dto";

@Injectable()
export class FundedProjectsService {
  constructor(
    @InjectRepository(EN_FundedProject)
    private readonly fundedProjectsRepo: Repository<EN_FundedProject>,
  ) {}

  async createFundedProject(payload: FundedProjectsDTO) {
    try {
      const newFundedProject = this.fundedProjectsRepo.create(payload);
      return await this.fundedProjectsRepo.save(newFundedProject);
    } catch (error) {
      return error;
    }
  }

  async getAllFundedProjectsData(
    pagination: { page: number; limit: number },
    search?: string,
  ) {
    try {
      const { page, limit } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page && limit && limit > 0) {
        pageSize = limit;
        skip = pageSize * (page - 1);
      }

      let query = this.fundedProjectsRepo.createQueryBuilder("funded_projects");

      if (search) {
        query = query.where(
          "funded_projects.title LIKE :search OR funded_projects.description LIKE :search",
          { search: `%${search}%` },
        );
      }

      const [data, total] = await query
        .orderBy("funded_projects.created_at", "DESC")
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getFundedProjectById(id: number) {
    try {
      return await this.fundedProjectsRepo.findOne({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async updateFundedProject(payload: FundedProjectsDTO, id: number) {
    try {
      return await this.fundedProjectsRepo.update({ id }, payload);
    } catch (error) {
      return error;
    }
  }

  async deleteFundedProject(ids: number[]) {
    try {
      return await this.fundedProjectsRepo.delete({ id: In(ids) });
    } catch (error) {
      return error;
    }
  }
}
