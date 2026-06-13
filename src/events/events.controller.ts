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
import { EventsDTO } from "./entity/events.dto";
import { EventsService } from "./events.service";
import { DeleteEventDTO } from "./entity/events.dto";
import { EN_Events } from "./entity/events.entity";

@ApiTags("Events")
@Controller("events")
export class EventsController {
  constructor(public eventsService: EventsService) {}

  @Post("create")
  @ApiBody({ type: EventsDTO })
  async create(@Body() payload: EventsDTO) {
    try {
      const newData = await this.eventsService.create(payload as EN_Events);
      return {
        success: true,
        message: "Event Added Successfully.",
        data: newData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new event",
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
  @ApiQuery({ name: "status", required: false, type: String })
  async getAllData(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string,
    @Query("status") status: string,
  ) {
    try {
      const allData = await this.eventsService.getEventsData({
        page,
        limit,
        search,
        status,
      });
      return {
        success: true,
        message: "Events Fetched Successfully.",
        data: allData.data,
        count: allData.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Events Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      const eventData = await this.eventsService.getEventById(id);
      return eventData;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Event Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put("updateEvents/:id")
  @ApiBody({ type: EventsDTO })
  async updateEvents(@Param("id") id: number, @Body() payload: EventsDTO) {
    try {
      const updatedData = await this.eventsService.updateEventsData(
        id,
        payload,
      );
      return updatedData;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating event",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("deleteEvents")
  @ApiBody({ type: DeleteEventDTO })
  async deleteEvent(@Body() payload: DeleteEventDTO) {
    try {
      const deletedData = await this.eventsService.deleteEvents(payload.ids);
      return deletedData;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting event",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
