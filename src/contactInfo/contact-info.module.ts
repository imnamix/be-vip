import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_ContactInfo } from "./entity/contact-info.entity";
import { ContactInfoController } from "./contact-info.controller";
import { ContactInfoService } from "./contact-info.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_ContactInfo])],
  controllers: [ContactInfoController],
  providers: [ContactInfoService],
  exports: [ContactInfoService],
})
export class ContactInfoModule {}
