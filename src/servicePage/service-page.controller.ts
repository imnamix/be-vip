import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ServicePageDTO } from "./entity/service-page.dto";
import { ServicePageService } from "./service-page.service";
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags("Service Page")
@Controller("service-page")
@UseGuards(OptionalAuthGuard, PermissionGuard)
export class ServicePageController {
  constructor(private readonly svc: ServicePageService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission('Content', 'write')
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
