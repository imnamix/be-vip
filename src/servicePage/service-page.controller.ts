import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ServicePageDTO } from "./entity/service-page.dto";
import { ServicePageService } from "./service-page.service";

@ApiTags("Service Page")
@Controller("service-page")
export class ServicePageController {
  constructor(private readonly svc: ServicePageService) {}

  @Post("save")
  @ApiBody({ type: ServicePageDTO })
  async save(@Body() dto: ServicePageDTO) {
    try {
      return await this.svc.createOrUpdate(dto);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while saving service page.", error },
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
        { success: false, message: "Error while fetching service page.", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
