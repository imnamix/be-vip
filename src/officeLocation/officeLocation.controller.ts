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
  Query,
} from "@nestjs/common";
import { OfficeLocationService } from "./officeLocation.service";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { OfficeLocationDTO } from "./entity/officeLocation.dto";
import { deleteLocDTO } from "./entity/deleteLoc.dto";

@ApiTags("Office Location")
@Controller("officeLocation")
export class OfficeLocationController {
  constructor(public officeLocService: OfficeLocationService) {}

  @Post("create")
  @ApiBody({ type: OfficeLocationDTO })
  async createOfficeLoc(@Body() obj: OfficeLocationDTO) {
    try {
      const newOffLoc = await this.officeLocService.create(obj);
      return {
        success: true,
        message: "Office Location Created Successfully.",
        data: newOffLoc,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new office location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAllOfficeLocation")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String }) //to make search optional
  async getAllOffLoc(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string
  ) {
    try {
      const allLocations = await this.officeLocService.getAllOfficeLoc({
        page,
        limit,
        search,
      });
      return {
        success: true,
        message: "Office Location Fetched Successfully.",
        data: allLocations.data,
        count: allLocations.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching office locations",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAllOfficeLocation/:id")
  async getLocById(@Param("id") id: number) {
    try {
      const officeLocation = await this.officeLocService.getLocById(id);
      return {
        success: officeLocation.success,
        message: officeLocation.message,
        data: officeLocation.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching office location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("updateOfficeLoc/:id")
  @ApiBody({ type: OfficeLocationDTO })
  async updateOffLoc(
    @Param("id") id: number,
    @Body() payload: OfficeLocationDTO
  ) {
    try {
      const prevLocation = await this.officeLocService.updateOfficeLocation(
        id,
        payload
      );

      return {
        success: prevLocation.success,
        message: prevLocation.message,
        data: prevLocation.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating office location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("deleteOfficeLoc")
  @ApiBody({ type: deleteLocDTO })
  async deleteOffLoc(@Body() deleteDTO: deleteLocDTO) {
    try {
      const deletedLocation = await this.officeLocService.deleteOffceLoc(
        deleteDTO.ids
      );

      return {
        success: deletedLocation.success,
        message: deletedLocation.message,
        data: deletedLocation.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating office location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
