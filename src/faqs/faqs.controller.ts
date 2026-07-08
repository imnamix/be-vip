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
import { FaqDTO } from "./entity/faq.dto";
import { FaqsService } from "./faqs.service";
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("FAQs")
@Controller("faqs")
@UseGuards(OptionalAuthGuard, PermissionGuard)
export class FaqsController {
  constructor(private readonly svc: FaqsService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'write')
  @Post("create")
  @ApiBody({ type: FaqDTO })
  async create(@Body() dto: FaqDTO) {
    try {
      return await this.svc.create(dto);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while creating FAQ.", error },
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
        { success: false, message: "Error while fetching FAQs.", error },
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
  @ApiBody({ type: FaqDTO })
  async update(@Param("id") id: number, @Body() dto: FaqDTO) {
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
