import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { PlanDTO } from "./entity/plan.dto";
import { PlanService } from "./plan.service";

@ApiTags("Plan")
@Controller("plan")
export class PlanController {
  constructor(public planService: PlanService) {}

  @Post("create")
  @ApiBody({ type: PlanDTO })
  async create(@Body() payload: PlanDTO) {
    try {
      const data = await this.planService.create(payload);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        success: true,
        message: "Plan created successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while creating plan",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("get-all")
  async getAll() {
    try {
      const data = await this.planService.getAll();
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: "Plans fetched successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching plans",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("get/:id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.planService.getById(id);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: "Plan fetched successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching plan",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: PlanDTO })
  async update(@Param("id") id: number, @Body() payload: PlanDTO) {
    try {
      const data = await this.planService.update(id, payload);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: "Plan updated successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating plan",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    try {
      const data = await this.planService.delete(id);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: "Plan deleted successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting plan",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
