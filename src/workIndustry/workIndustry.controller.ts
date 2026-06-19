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
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { WorkIndustryDTO } from "./entity/workIndustry.dto";
import { WorkIndustryService } from "./workIndustry.service";
import { DeleteWorkIndustryDTO } from "./entity/deleteWorkIndustry.dto";

@ApiTags("Work Industry")
@Controller("work-industry")
export class WorkIndustryController {
  constructor(public workIndustryService: WorkIndustryService) {}

  @Post("create")
  @ApiBody({ type: WorkIndustryDTO })
  async create(@Body() payload: WorkIndustryDTO) {
    try {
      const newData =
        await this.workIndustryService.createWorkIndustry(payload);
      return {
        success: true,
        message: "New Record Added Successfully",
        data: newData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Adding New Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search?: string,
  ) {
    try {
      const allData = await this.workIndustryService.getAllWorkIndustryData(
        {
          page,
          limit,
        },
        search,
      );
      return {
        success: true,
        message: "Record Fetched Successfully",
        data: allData.data,
        count: allData.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.workIndustryService.getWorkIndustryById(id);
      return {
        success: true,
        message: "Record Fetched Successfully",
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: WorkIndustryDTO })
  async update(@Body() payload: WorkIndustryDTO, @Param("id") id: number) {
    try {
      const updatedData = await this.workIndustryService.updateWorkIndustry(
        payload,
        id,
      );
      return {
        success: true,
        message: "Record Updated Successfully",
        data: updatedData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Updating Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteWorkIndustryDTO })
  async delete(@Body() payload: DeleteWorkIndustryDTO) {
    try {
      const deletedData = await this.workIndustryService.deleteWorkIndustry(
        payload.ids,
      );
      return {
        success: true,
        message: "Record Deleted Successfully",
        data: deletedData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Deleting Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
