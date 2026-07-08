import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EventBannerDTO } from './entity/event-banner.dto';
import { EventBannerService } from './event-banner.service';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("Event Banner")
@Controller("event-banner")
@UseGuards(OptionalAuthGuard, PermissionGuard)
export class EventBannerController {
  constructor(private readonly svc: EventBannerService) {}

  @Post('save')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Events', 'write')
  @ApiBody({ type: EventBannerDTO })
  async save(@Body() dto: EventBannerDTO) {
    try {
      return await this.svc.createOrUpdate(dto);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while saving event banner.", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("get")
  async get() {
    try {
      return await this.svc.get();
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching event banner.", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
