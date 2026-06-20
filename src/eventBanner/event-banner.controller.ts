import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { EventBannerDTO } from "./entity/event-banner.dto";
import { EventBannerService } from "./event-banner.service";

@ApiTags("Event Banner")
@Controller("event-banner")
export class EventBannerController {
  constructor(private readonly svc: EventBannerService) {}

  @Post("save")
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
