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
import { NewsBlogsService } from "./newsBlogs.service";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { NewsBlogsDTO } from "./entity/newsBlogs.dto";
import { DeleteNewsDTO } from "./entity/deleteNews.dto";

@ApiTags("News And Blogs")
@Controller("newsBlogs")
export class NewsBlogsController {
  constructor(public newsBlogsService: NewsBlogsService) {}

  @Post("create")
  @ApiBody({ type: NewsBlogsDTO })
  async create(@Body() obj: NewsBlogsDTO) {
    try {
      const newNewsBlog = await this.newsBlogsService.createNewsBlog(obj);
      return {
        success: true,
        message: "News/Blog Added Successfully.",
        data: newNewsBlog,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Adding New Blog/News",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAllNewsBlog")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String }) //to make search optional
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string
  ) {
    try {
      const allData = await this.newsBlogsService.getAllNewsBlogs({
        page,
        limit,
        search,
      });
      return {
        success: true,
        message: "News/Blogs Details Fetched Successfully.",
        data: allData.data,
        count: allData.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching News/Blogs",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.newsBlogsService.getAllNewsBlogsById(id);
      return {
        success: data.success,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: NewsBlogsDTO })
  async updateNewsBlog(@Param("id") id: number, @Body() data: NewsBlogsDTO) {
    try {
      const updatedData = await this.newsBlogsService.updateNewsBlog(id, data);
      return {
        success: updatedData.success,
        message: updatedData.message,
        data: updatedData.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Updating News/Blog",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteNewsDTO })
  async deleteNewsBlog(@Body() id: DeleteNewsDTO) {
    try {
      const deletedNewsBlog = await this.newsBlogsService.deleteNewsBlogs(
        id.ids
      );
      return {
        success: deletedNewsBlog.success,
        message: deletedNewsBlog.message,
        data: deletedNewsBlog.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Deleting",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
