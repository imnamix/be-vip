import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_WhatsappSettings } from "./entity/whatsapp-settings.entity";
import { WhatsappSettingsController } from "./whatsapp-settings.controller";
import { WhatsappSettingsService } from "./whatsapp-settings.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_WhatsappSettings])],
  controllers: [WhatsappSettingsController],
  providers: [WhatsappSettingsService],
})
export class WhatsappSettingsModule {}
