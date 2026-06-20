import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Faq } from "./entity/faq.entity";
import { FaqsService } from "./faqs.service";
import { FaqsController } from "./faqs.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Faq])],
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
