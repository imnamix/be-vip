import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Plan } from "./entity/plan.entity";
import { Repository } from "typeorm";
import { PlanDTO } from "./entity/plan.dto";

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(EN_Plan)
    private readonly planRepo: Repository<EN_Plan>,
  ) {}

  async create(obj: PlanDTO) {
    try {
      const newData = this.planRepo.create(obj);
      const savedData = await this.planRepo.save(newData);
      return {
        success: true,
        message: "Plan created successfully",
        data: savedData,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while creating plan",
        error: error,
      };
    }
  }

  async getAll() {
    try {
      const data = await this.planRepo.find({
        where: { status: 1 },
        order: { name: "ASC" },
        relations: ["plan_category"],
      });
      return {
        success: true,
        message: "Plans fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching plans",
        error: error,
      };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.planRepo.findOne({
        where: { id },
        relations: ["plan_category"],
      });

      if (!data) {
        return {
          success: false,
          message: "Plan not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Plan fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching plan",
        error: error,
      };
    }
  }

  async update(id: number, obj: PlanDTO) {
    try {
      let plan = await this.planRepo.findOne({
        where: { id },
      });

      if (!plan) {
        return {
          success: false,
          message: "Plan not found",
          data: null,
        };
      }

      Object.assign(plan, obj);
      const updatedData = await this.planRepo.save(plan);

      return {
        success: true,
        message: "Plan updated successfully",
        data: updatedData,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating plan",
        error: error,
      };
    }
  }

  async delete(id: number) {
    try {
      const plan = await this.planRepo.findOne({
        where: { id },
      });

      if (!plan) {
        return {
          success: false,
          message: "Plan not found",
          data: null,
        };
      }

      await this.planRepo.remove(plan);

      return {
        success: true,
        message: "Plan deleted successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting plan",
        error: error,
      };
    }
  }
}
