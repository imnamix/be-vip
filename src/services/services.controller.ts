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
import { ServicesDTO } from "./entity/services.dto";
import { ServicesService } from "./services.service";

@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(public servicesService: ServicesService) {}

  @Post("create")
  @ApiBody({ type: ServicesDTO })
  async create(@Body() payload: ServicesDTO) {
    try {
      const data = await this.servicesService.create(payload);
      return {
        success: true,
        message: "Service created successfully.",
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while creating service",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAll")
  async getAll() {
    try {
      const data = await this.servicesService.getAll();
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching services",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.servicesService.getById(id);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching service",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: ServicesDTO })
  async update(@Param("id") id: number, @Body() payload: ServicesDTO) {
    try {
      const data = await this.servicesService.update(id, payload);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.BAD_REQUEST
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating service",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    try {
      const data = await this.servicesService.delete(id);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.BAD_REQUEST
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting service",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
