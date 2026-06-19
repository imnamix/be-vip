import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_OfficeLocation } from "./entity/officeLocation.entity";
import { In, Like, Repository } from "typeorm";
import { OfficeLocationDTO } from "./entity/officeLocation.dto";

@Injectable()
export class OfficeLocationService {
  constructor(
    @InjectRepository(EN_OfficeLocation)
    private readonly plantLocationRepo: Repository<EN_OfficeLocation>
  ) {}

  async create(obj: OfficeLocationDTO) {
    try {
      const newOfficeLoc = this.plantLocationRepo.create(obj);
      return await this.plantLocationRepo.save(newOfficeLoc);
    } catch (error) {
      return error;
    }
  }

  async getAllOfficeLoc(pagination: {
    page: number;
    limit: number;
    search: string;
  }) {
    try {
      const { page, limit, search } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      const [data, total] = await this.plantLocationRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: search ? [{ officeNumber: Like(`%${search}%`) }] : null,
      });
      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getLocById(id: number) {
    try {
      const officeLocation = await this.plantLocationRepo.findOne({
        where: { id },
      });
      if (!officeLocation) {
        return {
          success: false,
          message: `Office location with ID ${id} not found`,
        };
      }
      return {
        success: true,
        message: "Successfully fetch office location",
        data: officeLocation,
      };
    } catch (error) {
      return error;
    }
  }

  async updateOfficeLocation(id: number, payload: OfficeLocationDTO) {
    try {
      const officeLocation = await this.plantLocationRepo.findOne({
        where: { id },
      });
      if (!officeLocation) {
        return {
          success: false,
          message: `Office location with ID ${id} not found`,
        };
      }
      this.plantLocationRepo.merge(officeLocation, payload);
      const updatedLocation = await this.plantLocationRepo.save(officeLocation);
      return {
        success: true,
        message: "Office Location Updated Successfully.",
        data: updatedLocation,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteOffceLoc(id: number[]) {
    try {
      const officeLocation = await this.plantLocationRepo.findBy({
        id: In(id),
      });
      if (officeLocation.length === 0) {
        return {
          success: false,
          message: `Office location with ID ${id} not found`,
        };
      }
      this.plantLocationRepo.delete(id);
      return {
        success: true,
        message: "Office Location Deleted Successfully.",
        data: officeLocation,
      };
    } catch (error) {
      return error;
    }
  }
}
