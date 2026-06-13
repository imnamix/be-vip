import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_NewsBlogs } from "./entity/newsBlogs.entity";
import { NewsBlogsController } from "./newsBlogs.controller";
import { NewsBlogsService } from "./newsBlogs.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_NewsBlogs])],
  controllers: [NewsBlogsController],
  providers: [NewsBlogsService],
})
export class NewsBlogModule {}
