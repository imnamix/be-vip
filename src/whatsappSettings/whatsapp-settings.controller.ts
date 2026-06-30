import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { WhatsappSettingsService } from './whatsapp-settings.service';
import { WhatsappSettingsDTO } from './entity/whatsapp-settings.dto';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags('whatsapp-settings')
@Controller('whatsappSettings')
@UseGuards(AuthGuard, PermissionGuard)
export class WhatsappSettingsController {
  constructor(private readonly service: WhatsappSettingsService) {}

  @Get('get')
  @Permission('Settings', 'read')
  async get() {
    try {
      const data = await this.service.get();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error fetching WhatsApp settings", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('save')
  @Permission('Settings', 'write')
  @ApiBody({ type: WhatsappSettingsDTO })
  async save(@Body() payload: WhatsappSettingsDTO) {
    try {
      const data = await this.service.save(payload);
      return { success: true, message: "WhatsApp settings saved successfully.", data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error saving WhatsApp settings", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
