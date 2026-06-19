import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_BrandInfo } from "./entity/brandinfo.entity";
import { Repository } from "typeorm";
import { BrandInfoDTO } from "./entity/brandinfo.dto";

@Injectable()
export class BrandInfoService {
  constructor(
    @InjectRepository(EN_BrandInfo)
    private readonly brandinfoRepo: Repository<EN_BrandInfo>
  ) {}

  async create(obj: BrandInfoDTO) {
    try {
      const existingBrandInfo = await this.brandinfoRepo.findOne({
        where: {},
      });

      if (existingBrandInfo) {
        // If brand info exists, update it
        Object.assign(existingBrandInfo, obj);
        const updatedData = await this.brandinfoRepo.save(existingBrandInfo);
        return updatedData;
      }

      // If no brand info exists, create a new one
      const newData = this.brandinfoRepo.create(obj);
      return await this.brandinfoRepo.save(newData);
    } catch (error) {
      return error;
    }
  }

  async get() {
    try {
      const data = await this.brandinfoRepo.findOne({
        where: { status: 1 },
      });
    //   if (!data) {
    //     return {
    //       success: false,
    //       message: "Brand info not found",
    //       data: null,
    //     };
    //   }
      return {
        success: true,
        message: "Brand info fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching brand info",
        error: error,
      };
    }
  }

  async update(obj: BrandInfoDTO) {
    try {
      let brandInfo = await this.brandinfoRepo.findOne({
        where: {},
      });

      if (!brandInfo) {
        // If no brand info exists, create one
        const newData = this.brandinfoRepo.create(obj);
        const createdData = await this.brandinfoRepo.save(newData);
        return {
          success: true,
          message: "Brand info created successfully",
          data: createdData,
        };
      }

      // Update existing brand info
      Object.assign(brandInfo, obj);
      const updatedData = await this.brandinfoRepo.save(brandInfo);
      return {
        success: true,
        message: "Brand info updated successfully",
        data: updatedData,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating brand info",
        error: error,
      };
    }
  }
}
