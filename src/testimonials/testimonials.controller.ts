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
import { TestimonialDTO } from "./entity/testimonial.dto";
import { TestimonialsService } from "./testimonials.service";
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("Testimonials")
@Controller("testimonials")
@UseGuards(OptionalAuthGuard, PermissionGuard)
export class TestimonialsController {
  constructor(private readonly svc: TestimonialsService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'write')
  @Post("create")
  @ApiBody({ type: TestimonialDTO })
  async create(@Body() dto: TestimonialDTO) {
    try {
      const data = await this.svc.create(dto);
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while creating testimonial.", error },
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
        { success: false, message: "Error while fetching testimonials.", error },
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
  @ApiBody({ type: TestimonialDTO })
  async update(@Param("id") id: number, @Body() dto: TestimonialDTO) {
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
