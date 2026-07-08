import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { EventRegistrationService } from "./event-registration.service";
import {
  CreateEventRegistrationDTO,
  UpdateEventRegistrationStatusDTO,
} from "./entity/event-registration.dto";
import { AuthGuard } from "../auth/guards/auth.gaurd";
import { PermissionGuard } from "../auth/guards/permission.guard";
import { Permission } from "../auth/decorators/permission.decorator";

@ApiTags("Event Registration")
@Controller("event-registration")
export class EventRegistrationController {
  constructor(private readonly service: EventRegistrationService) {}

  // Public — submitted from the event details "Register Now" popup
  @Post("create")
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateEventRegistrationDTO })
  async create(@Body() dto: CreateEventRegistrationDTO) {
    try {
      return await this.service.create(dto);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while registering for event", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("byEvent/:eventId")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission("Events", "read")
  async getByEvent(@Param("eventId") eventId: number) {
    try {
      return await this.service.getByEvent(eventId);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching registrations", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch("updateStatus/:id")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission("Events", "update")
  @ApiBody({ type: UpdateEventRegistrationStatusDTO })
  async updateStatus(@Param("id") id: number, @Body() dto: UpdateEventRegistrationStatusDTO) {
    try {
      return await this.service.updateStatus(id, dto.status);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while updating registration status", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
