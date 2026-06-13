import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_PlanCategory } from "./entity/planCategory.entity";
import { Repository } from "typeorm";
import { PlanCategoryDTO } from "./entity/planCategory.dto";

@Injectable()
export class PlanCategoryService {
  constructor(
    @InjectRepository(EN_PlanCategory)
    private readonly planCategoryRepo: Repository<EN_PlanCategory>,
  ) {}

  async create(obj: PlanCategoryDTO) {
    try {
      const newData = this.planCategoryRepo.create(obj);
      const savedData = await this.planCategoryRepo.save(newData);
      return {
        success: true,
        message: "Plan category created successfully",
        data: savedData,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while creating plan category",
        error: error,
      };
    }
  }

  async getAll() {
    try {
      const data = await this.planCategoryRepo.find({
        // where: { status: 1 },
        order: { name: "ASC" },
      });
      return {
        success: true,
        message: "Plan categories fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching plan categories",
        error: error,
      };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.planCategoryRepo.findOne({
        where: { id },
      });

      if (!data) {
        return {
          success: false,
          message: "Plan category not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Plan category fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching plan category",
        error: error,
      };
    }
  }

  async update(id: number, obj: PlanCategoryDTO) {
    try {
      let planCategory = await this.planCategoryRepo.findOne({
        where: { id },
      });

      if (!planCategory) {
        return {
          success: false,
          message: "Plan category not found",
          data: null,
        };
      }

      Object.assign(planCategory, obj);
      const updatedData = await this.planCategoryRepo.save(planCategory);

      return {
        success: true,
        message: "Plan category updated successfully",
        data: updatedData,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating plan category",
        error: error,
      };
    }
  }

  async delete(id: number) {
    try {
      const planCategory = await this.planCategoryRepo.findOne({
        where: { id },
      });

      if (!planCategory) {
        return {
          success: false,
          message: "Plan category not found",
          data: null,
        };
      }

      await this.planCategoryRepo.remove(planCategory);

      return {
        success: true,
        message: "Plan category deleted successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting plan category",
        error: error,
      };
    }
  }
}
