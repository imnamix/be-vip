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
import { GalleryDTO } from "./entity/gallery.dto";
import { GalleryService } from "./gallery.service";
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("Gallery")
@Controller("gallery")
@UseGuards(OptionalAuthGuard, PermissionGuard)
export class GalleryController {
  constructor(public galleryService: GalleryService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'write')
  @Post("create")
  @ApiBody({ type: GalleryDTO })
  async create(@Body() payload: GalleryDTO) {
    try {
      const data = await this.galleryService.create(payload);
      return { success: true, message: "Gallery item created successfully.", data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while creating gallery item", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getAll")
  async getAll(
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "1000",
    @Query("search") search: string = "",
  ) {
    try {
      const data = await this.galleryService.getAll(+skip, +take, search);
      if (!data.success) {
        throw new HttpException({ success: false, message: data.message }, HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching gallery items", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.galleryService.getById(id);
      if (!data.success) {
        throw new HttpException({ success: false, message: data.message }, HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching gallery item", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'update')
  @Put("update/:id")
  @ApiBody({ type: GalleryDTO })
  async update(@Param("id") id: number, @Body() payload: GalleryDTO) {
    try {
      const data = await this.galleryService.update(id, payload);
      if (!data.success) {
        throw new HttpException({ success: false, message: data.message }, HttpStatus.BAD_REQUEST);
      }
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while updating gallery item", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'delete')
  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    try {
      const data = await this.galleryService.delete(id);
      if (!data.success) {
        throw new HttpException({ success: false, message: data.message }, HttpStatus.BAD_REQUEST);
      }
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while deleting gallery item", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
