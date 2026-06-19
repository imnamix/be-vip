import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Services } from "./entity/services.entity";
import { Repository } from "typeorm";
import { ServicesDTO } from "./entity/services.dto";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(EN_Services)
    private readonly servicesRepo: Repository<EN_Services>,
  ) {}

  async create(obj: ServicesDTO) {
    try {
      const newData = this.servicesRepo.create(obj);
      return await this.servicesRepo.save(newData);
    } catch (error) {
      return error;
    }
  }

  async getAll(skip: number = 0, take: number = 5, searchKey: string = "") {
    try {
      let query = this.servicesRepo
        .createQueryBuilder("service")
        .where("service.status = :status", { status: 1 });

      if (searchKey && searchKey.trim()) {
        query = query.andWhere(
          "(service.title LIKE :searchKey OR service.description LIKE :searchKey OR service.bannerTitle LIKE :searchKey)",
          { searchKey: `%${searchKey}%` },
        );
      }

      const [data, total] = await query
        .orderBy("service.created_at", "DESC")
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return {
        success: true,
        message: "Services fetched successfully",
        data: data,
        total: total,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching services",
        error: error,
      };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.servicesRepo.findOne({
        where: { id, status: 1 },
      });
      if (!data) {
        return {
          success: false,
          message: `Service with id ${id} not found`,
          data: null,
        };
      }
      return {
        success: true,
        message: "Service fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching service",
        error: error,
      };
    }
  }

  async update(id: number, obj: ServicesDTO) {
    try {
      let service = await this.servicesRepo.findOne({
        where: { id },
      });

      if (!service) {
        return {
          success: false,
          message: `Service with id ${id} not found`,
        };
      }

      Object.assign(service, obj);
      const updatedData = await this.servicesRepo.save(service);
      return {
        success: true,
        message: "Service updated successfully",
        data: updatedData,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating service",
        error: error,
      };
    }
  }

  async delete(id: number) {
    try {
      const service = await this.servicesRepo.findOne({
        where: { id },
      });

      if (!service) {
        return {
          success: false,
          message: `Service with id ${id} not found`,
        };
      }

      await this.servicesRepo.remove(service);
      return {
        success: true,
        message: "Service deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting service",
        error: error,
      };
    }
  }
}
