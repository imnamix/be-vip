import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_VideoTestimonial } from "./entity/video-testimonial.entity";
import { VideoTestimonialsService } from "./video-testimonials.service";
import { VideoTestimonialsController } from "./video-testimonials.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_VideoTestimonial])],
  controllers: [VideoTestimonialsController],
  providers: [VideoTestimonialsService],
})
export class VideoTestimonialsModule {}
