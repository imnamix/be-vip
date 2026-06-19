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
import {
  FundedProjectsDTO,
  DeleteFundedProjectsDTO,
} from "./entity/fundedProjects.dto";
import { FundedProjectsService } from "./fundedProjects.service";

@ApiTags("Funded Projects")
@Controller("funded-projects")
export class FundedProjectsController {
  constructor(public fundedProjectsService: FundedProjectsService) {}

  @Post("create")
  @ApiBody({ type: FundedProjectsDTO })
  async create(@Body() payload: FundedProjectsDTO) {
    try {
      const newData =
        await this.fundedProjectsService.createFundedProject(payload);
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
      const allData = await this.fundedProjectsService.getAllFundedProjectsData(
        { page, limit },
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
      const data = await this.fundedProjectsService.getFundedProjectById(id);
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
  @ApiBody({ type: FundedProjectsDTO })
  async update(@Param("id") id: number, @Body() payload: FundedProjectsDTO) {
    try {
      const updatedData = await this.fundedProjectsService.updateFundedProject(
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
  @ApiBody({ type: DeleteFundedProjectsDTO })
  async delete(@Body() deleteDTO: DeleteFundedProjectsDTO) {
    try {
      const deletedData = await this.fundedProjectsService.deleteFundedProject(
        deleteDTO.ids,
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
