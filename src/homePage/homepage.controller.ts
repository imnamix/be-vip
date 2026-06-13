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
import { HomePageDTO } from "./entity/homepage.dto";
import { HomePageService } from "./homepage.service";
import { DeleteHomeDTO } from "./entity/deleteHome.dto";

@ApiTags("Home Page")
@Controller("homePage")
export class HomePageController {
  constructor(public homePageService: HomePageService) {}

  @Post("create")
  @ApiBody({ type: HomePageDTO })
  async create(@Body() payload: HomePageDTO) {
    try {
      const newData = await this.homePageService.createHomePage(payload);
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
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000
  ) {
    try {
      const allData = await this.homePageService.getAllHomePageData({
        page,
        limit,
      });
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
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      const homeData = await this.homePageService.getHomeById(id);
      return homeData;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: HomePageDTO })
  async updateData(@Body() payload: HomePageDTO, @Param("id") id: number) {
    try {
      const updatedData = await this.homePageService.updateHomePage(
        id,
        payload
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
          message: "Error While Updating Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteHomeDTO })
  async deleteHomeData(@Body() id: DeleteHomeDTO) {
    try {
      const deletedData = await this.homePageService.deleteHomePage(id.ids);
      return {
        success: deletedData.success,
        message: deletedData.message,
        data: deletedData.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Deleting Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
