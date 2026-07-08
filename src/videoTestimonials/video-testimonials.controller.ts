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
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { VideoTestimonialDTO } from "./entity/video-testimonial.dto";
import { VideoTestimonialsService } from "./video-testimonials.service";
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("Video Testimonials")
@Controller("video-testimonials")
@UseGuards(OptionalAuthGuard, PermissionGuard)
export class VideoTestimonialsController {
  constructor(private readonly svc: VideoTestimonialsService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'write')
  @Post("create")
  @ApiBody({ type: VideoTestimonialDTO })
  async create(@Body() dto: VideoTestimonialDTO) {
    try {
      return await this.svc.create(dto);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while creating video testimonial.", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getAll")
  async getAll(
    @Query("skip") skip = "0",
    @Query("take") take = "1000",
    @Query("search") search = "",
  ) {
    try {
      return await this.svc.getAll(+skip, +take, search);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching video testimonials.", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    const data = await this.svc.getById(id);
    if (!data.success) throw new HttpException(data, HttpStatus.NOT_FOUND);
    return data;
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'update')
  @Put("update/:id")
  @ApiBody({ type: VideoTestimonialDTO })
  async update(@Param("id") id: number, @Body() dto: VideoTestimonialDTO) {
    const data = await this.svc.update(id, dto);
    if (!data.success) throw new HttpException(data, HttpStatus.BAD_REQUEST);
    return data;
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'delete')
  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    const data = await this.svc.delete(id);
    if (!data.success) throw new HttpException(data, HttpStatus.BAD_REQUEST);
    return data;
  }
}
