import {
  Body, Controller, Delete, Get, HttpException,
  HttpStatus, Param, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { VipNumbersDTO } from './entity/vip-numbers.dto';
import { VipNumbersService } from './vip-numbers.service';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags('VIP Numbers')
@Controller('vip-numbers')
export class VipNumbersController {
  constructor(private readonly svc: VipNumbersService) {}

  @Post('create')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Top VIP Numbers', 'write')
  @ApiBody({ type: VipNumbersDTO })
  async create(@Body() dto: VipNumbersDTO) {
    try {
      const data = await this.svc.create(dto);
      if (!data.success) throw new HttpException(data, HttpStatus.BAD_REQUEST);
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while creating VIP number.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Public — used by the website catalog
  @Get('getAll')
  @ApiQuery({ name: 'page',     required: false, type: Number })
  @ApiQuery({ name: 'limit',    required: false, type: Number })
  @ApiQuery({ name: 'search',   required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  async getAll(
    @Query('page')     page: number     = 1,
    @Query('limit')    limit: number    = 10,
    @Query('search')   search: string   = '',
    @Query('category') category: string = '',
  ) {
    try {
      return await this.svc.getAll(+page, +limit, search, category);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while fetching VIP numbers.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Public — individual detail page
  @Get('getById/:id')
  async getById(@Param('id') id: number) {
    try {
      const data = await this.svc.getById(+id);
      if (!data.success) throw new HttpException(data, HttpStatus.NOT_FOUND);
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while fetching VIP number.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('update/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Top VIP Numbers', 'update')
  @ApiBody({ type: VipNumbersDTO })
  async update(@Param('id') id: number, @Body() dto: VipNumbersDTO) {
    try {
      const data = await this.svc.update(+id, dto);
      if (!data.success) throw new HttpException(data, HttpStatus.BAD_REQUEST);
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while updating VIP number.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Top VIP Numbers', 'delete')
  async delete(@Param('id') id: number) {
    try {
      const data = await this.svc.delete(+id);
      if (!data.success) throw new HttpException(data, HttpStatus.BAD_REQUEST);
      return data;
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while deleting VIP number.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
