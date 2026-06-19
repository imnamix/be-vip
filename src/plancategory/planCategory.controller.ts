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
import { PlanCategoryDTO } from "./entity/planCategory.dto";
import { PlanCategoryService } from "./planCategory.service";

@ApiTags("Plan Category")
@Controller("plancategory")
export class PlanCategoryController {
  constructor(public planCategoryService: PlanCategoryService) {}

  @Post("create")
  @ApiBody({ type: PlanCategoryDTO })
  async create(@Body() payload: PlanCategoryDTO) {
    try {
      const data = await this.planCategoryService.create(payload);
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
        message: "Plan category created successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while creating plan category",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("get-all")
  async getAll() {
    try {
      const data = await this.planCategoryService.getAll();
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
        message: "Plan categories fetched successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching plan categories",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("get/:id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.planCategoryService.getById(id);
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
        message: "Plan category fetched successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching plan category",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: PlanCategoryDTO })
  async update(@Param("id") id: number, @Body() payload: PlanCategoryDTO) {
    try {
      const data = await this.planCategoryService.update(id, payload);
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
        message: "Plan category updated successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating plan category",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    try {
      const data = await this.planCategoryService.delete(id);
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
        message: "Plan category deleted successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting plan category",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
