import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_GeneralInquiry } from "./entity/general-inquiry.entity";
import { GeneralInquiryController } from "./general-inquiry.controller";
import { GeneralInquiryService } from "./general-inquiry.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_GeneralInquiry])],
  controllers: [GeneralInquiryController],
  providers: [GeneralInquiryService],
})
export class GeneralInquiryModule {}
