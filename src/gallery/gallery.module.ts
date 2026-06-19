import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Gallery } from "./entity/gallery.entity";
import { GalleryService } from "./gallery.service";
import { GalleryController } from "./gallery.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Gallery])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
