import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { BrandInfoDTO } from "./entity/brandinfo.dto";
import { BrandInfoService } from "./brandinfo.service";
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("Brand Info")
@Controller("brandinfo")
export class BrandInfoController {
  constructor(public brandinfoService: BrandInfoService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'write')
  @Post("create")
  @ApiBody({ type: BrandInfoDTO })
  async createOrUpdate(@Body() payload: BrandInfoDTO) {
    try {
      const data = await this.brandinfoService.create(payload);
      return {
        success: true,
        message: "Brand Info saved successfully.",
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while saving brand info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("get")
  async get() {
    try {
      const data = await this.brandinfoService.get();
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND
        );
      }
      return {
        success: true,
        message: "Brand Info Fetched Successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Brand Info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'update')
  @Put("update")
  @ApiBody({ type: BrandInfoDTO })
  async update(@Body() payload: BrandInfoDTO) {
    try {
      const data = await this.brandinfoService.update(payload);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND
        );
      }
      return {
        success: true,
        message: "Brand Info Updated Successfully.",
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating brand info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
