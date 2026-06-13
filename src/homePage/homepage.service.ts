import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_HomePage } from "./entity/homepage.entity";
import { In, Like, Repository } from "typeorm";
import { HomePageDTO } from "./entity/homepage.dto";

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(EN_HomePage)
    private readonly homePageRepo: Repository<EN_HomePage>
  ) {}

  async createHomePage(payload: HomePageDTO) {
    try {
      const newHomePageData = this.homePageRepo.create(payload);
      return await this.homePageRepo.save(newHomePageData);
    } catch (error) {
      return error;
    }
  }
  async getAllHomePageData(pagination: { page: number; limit: number }) {
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

      const [data, total] = await this.homePageRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
      });

      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getHomeById(id: number) {
    try {
      const homeData = await this.homePageRepo.findOne({ where: { id } });
      if (!homeData) {
        return {
          success: false,
          message: `Failed to get home data, ID ${id} not found`,
        };
      }
      return {
        success: true,
        message: "Data Fetch Successfully",
        data: homeData,
      };
    } catch (error) {
      return error;
    }
  }

  async updateHomePage(id: number, payload: HomePageDTO) {
    try {
      const homePageData = await this.homePageRepo.findOne({ where: { id } });
      if (!homePageData) {
        return {
          success: false,
          message: `Failed to update, ID ${id} not found`,
        };
      }
      this.homePageRepo.merge(homePageData, payload);
      const updatedData = await this.homePageRepo.save(homePageData);
      return {
        success: true,
        message: "Record Updated Successfully",
        data: updatedData,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteHomePage(id: number[]) {
    try {
      const existingData = await this.homePageRepo.findBy({ id: In(id) });
      if (existingData.length === 0) {
        return {
          success: false,
          message: `Failed to delete, ID ${id} not found`,
        };
      }
      await this.homePageRepo.delete(id);
      return {
        success: true,
        message: "Record Deleted Successfully",
        data: existingData,
      };
    } catch (error) {
      return error;
    }
  }
}
