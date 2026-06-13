import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EN_ProjectLocation } from "./entity/projectLocation.entity";
import { ProjectLocationDTO } from "./entity/projectLocation.dto";

@Injectable()
export class ProjectLocationService {
  constructor(
    @InjectRepository(EN_ProjectLocation)
    private readonly projectLocationRepo: Repository<EN_ProjectLocation>
  ) {}

  async create(obj: ProjectLocationDTO) {
    try {
      // if (obj.googleMapLink.length > 1000) {
      //   return new HttpException(
      //     "Data too long for column googleMapLink",
      //     HttpStatus.BAD_REQUEST
      //   );
      // }
      const newLocation = this.projectLocationRepo.create(obj);
      const data = await this.projectLocationRepo.save(newLocation);
      return {
        success: true,
        message: "Project Details Added Successfully.",
        data: data,
      };
    } catch (error) {
      return error;
    }
  }

  async getAllProjectLocations(pagination: {
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

      const [data, total] = await this.projectLocationRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: search ? [{ projectName: Like(`%${search}%`) }] : null,
      });

      return {
        count: total,
        data: data,
      };
    } catch (error) {
      return error;
    }
  }

  async getProjectLocById(id: number) {
    try {
      const projectLocation = await this.projectLocationRepo.findOne({
        where: { id },
      });
      return projectLocation;
    } catch (error) {
      return error;
    }
  }

  async updateProjectLocation(id: number, obj: ProjectLocationDTO) {
    try {
      const updateLocation = await this.projectLocationRepo.findOne({
        where: { id },
      });

      if (!updateLocation) {
        return {
          success: false,
          message: `Project Details with ID ${id} not found`,
        };
      }
      this.projectLocationRepo.merge(updateLocation, obj);
      await this.projectLocationRepo.save(updateLocation);
      return {
        success: true,
        message: "Project Details Updated Successfully.",
        data: updateLocation,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteProjectLocation(id: number[]) {
    try {
      const deletedLocation = await this.projectLocationRepo.findBy({
        id: In(id),
      });
      if (deletedLocation.length === 0) {
        return {
          success: false,
          message: `Project Details with ID ${id} not found`,
        };
      }
      await this.projectLocationRepo.delete(id);
      return {
        success: true,
        message: "Project Details Deleted Successfully.",
        data: deletedLocation,
      };
    } catch (error) {
      return error;
    }
  }
}
