import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_AboutUs } from "./entity/aboutus.entity";
import { In, Like, Repository } from "typeorm";
import { AboutusDTO } from "./entity/aboutus.dto";

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(EN_AboutUs)
    private readonly aboutusRepo: Repository<EN_AboutUs>,
  ) {}

  async create(obj: EN_AboutUs) {
    try {
      const newData = this.aboutusRepo.create(obj);
      return await this.aboutusRepo.save(newData);
    } catch (error) {
      return error;
    }
  }

  async getAboutusData(pagination: {
    page: number;
    limit: number;
    search: string;
    status?: string;
  }) {
    try {
      const { page, limit, search, status } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      let whereCondition: any = null;
      if (status === "active") {
        whereCondition = search
          ? [{ businessName: Like(`%${search}%`), status: 1 }]
          : { status: 1 };
      } else {
        whereCondition = search
          ? [{ businessName: Like(`%${search}%`) }]
          : null;
      }

      const [data, total] = await this.aboutusRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: whereCondition,
      });
      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getAboutUsById(id: number) {
    try {
      const aboutUsData = await this.aboutusRepo.findOne({ where: { id } });
      if (!aboutUsData) {
        return {
          success: false,
          message: `Failed to get about us data, id ${id} not found`,
        };
      }
      return {
        success: true,
        message: "Data Fetch Successfully",
        data: aboutUsData,
      };
    } catch (error) {
      return error;
    }
  }

  async updateAboutusData(id: number, obj: AboutusDTO) {
    try {
      const updateAboutus = await this.aboutusRepo.findOne({
        where: { id },
      });

      if (!updateAboutus) {
        return {
          success: false,
          message: `ID ${id} Not Found`,
        };
      }
      this.aboutusRepo.merge(updateAboutus, obj);
      await this.aboutusRepo.save(updateAboutus);
      return {
        success: true,
        message: "Information Updated Successfully.",
        data: updateAboutus,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteAboutus(id: number[]) {
    try {
      const deletedData = await this.aboutusRepo.findBy({
        id: In(id),
      });
      if (deletedData.length === 0) {
        return {
          success: false,
          message: `Error While Deleting With ID ${id} Not Found`,
        };
      }
      await this.aboutusRepo.delete(id);
      return {
        success: true,
        message: "Information Deleted Successfully.",
        data: deletedData,
      };
    } catch (error) {
      return error;
    }
  }
}
