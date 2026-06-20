import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Testimonial } from "./entity/testimonial.entity";
import { TestimonialsService } from "./testimonials.service";
import { TestimonialsController } from "./testimonials.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Testimonial])],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
