import { Module } from "@nestjs/common";
import { EN_Enquiry } from "./entity/enquiry.entity";
import { EnquiryController } from "./enquiry.controller";
import { EnquiryService } from "./enquiry.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailService } from "../EmailService/mailService";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Enquiry])],
  controllers: [EnquiryController],
  providers: [EnquiryService, EmailService], // 👈 add EmailService to providers
})
export class EnquiryModule {}
