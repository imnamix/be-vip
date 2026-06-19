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
import { AboutusDTO } from "./entity/aboutus.dto";
import { AboutUsService } from "./aboutus.service";
import { DeleteAboutDTO } from "./entity/deleteAbout.dto";
import { EN_AboutUs } from "./entity/aboutus.entity";

@ApiTags("About Us")
@Controller("aboutus")
export class AboutusController {
  constructor(public aboutusService: AboutUsService) {}

  @Post("create")
  @ApiBody({ type: AboutusDTO })
  async create(@Body() payload: AboutusDTO) {
    try {
      const newData = await this.aboutusService.create(payload);
      return {
        success: true,
        message: "Information Added Successfully.",
        data: newData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new about us data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String }) //to make search optional
  @ApiQuery({ name: "status", required: false, type: String })
  async getAllData(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string,
    @Query("status") status: string,
  ) {
    try {
      const allData = await this.aboutusService.getAboutusData({
        page,
        limit,
        search,
        status,
      });
      return {
        success: true,
        message: "Information Fetched Successfully.",
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
      const aboutUsData = await this.aboutusService.getAboutUsById(id);
      return aboutUsData;
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

  @Put("updateAboutUs/:id")
  @ApiBody({ type: AboutusDTO })
  async updateAboutUs(@Param("id") id: number, @Body() payload: AboutusDTO) {
    try {
      const updatedData = await this.aboutusService.updateAboutusData(
        id,
        payload,
      );

      return {
        success: updatedData.success,
        message: updatedData.message,
        data: updatedData.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Updating",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("deleteAboutus")
  @ApiBody({ type: DeleteAboutDTO })
  async deletePlantLoc(@Body() id: DeleteAboutDTO) {
    try {
      const data = await this.aboutusService.deleteAboutus(id.ids);
      return {
        success: data.success,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting about us data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
