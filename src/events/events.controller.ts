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
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { EventsDTO, DeleteEventDTO } from './entity/events.dto';
import { EventsService } from './events.service';
import { EN_Events } from './entity/events.entity';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(public eventsService: EventsService) {}

  @Post('create')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Events', 'write')
  @ApiBody({ type: EventsDTO })
  async create(@Body() payload: EventsDTO) {
    try {
      const newData = await this.eventsService.create(payload as EN_Events);
      return { success: true, message: 'Event Added Successfully.', data: newData };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while adding new event', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getAll')
  @ApiQuery({ name: 'page',   required: false, type: Number })
  @ApiQuery({ name: 'limit',  required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  async getAllData(
    @Query('page')   page: number  = 1,
    @Query('limit')  limit: number = 1000,
    @Query('search') search: string,
    @Query('status') status: string,
  ) {
    try {
      const allData = await this.eventsService.getEventsData({ page, limit, search, status }) as { data: any[]; count: number };
      return {
        success: true,
        message: 'Events Fetched Successfully.',
        data: allData.data,
        count: allData.count,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error While Fetching Events Data', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getById/:id')
  async getById(@Param('id') id: number) {
    try {
      return await this.eventsService.getEventById(id);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error While Fetching Event Data', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('updateEvents/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Events', 'update')
  @ApiBody({ type: EventsDTO })
  async updateEvents(@Param('id') id: number, @Body() payload: EventsDTO) {
    try {
      return await this.eventsService.updateEventsData(id, payload);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while updating event', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('deleteEvents')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Events', 'delete')
  @ApiBody({ type: DeleteEventDTO })
  async deleteEvent(@Body() payload: DeleteEventDTO) {
    try {
      return await this.eventsService.deleteEvents(payload.ids);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while deleting event', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
