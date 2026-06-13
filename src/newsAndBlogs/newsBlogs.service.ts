import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_NewsBlogs } from "./entity/newsBlogs.entity";
import { In, Like, Repository } from "typeorm";
import { NewsBlogsDTO } from "./entity/newsBlogs.dto";

@Injectable()
export class NewsBlogsService {
  constructor(
    @InjectRepository(EN_NewsBlogs)
    private readonly newsBlogRepo: Repository<EN_NewsBlogs>
  ) {}

  async createNewsBlog(obj: NewsBlogsDTO) {
    try {
      const newNewsBlog = this.newsBlogRepo.create(obj);
      return await this.newsBlogRepo.save(newNewsBlog);
    } catch (error) {
      return error;
    }
  }

  async getAllNewsBlogs(pagination: {
    page: number;
    limit: number;
    search: string;
  }) {
    try {
      const { page, limit, search } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }
      const [data, total] = await this.newsBlogRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: search ? [{ headline: Like(`%${search}%`) }] : null,
      });
      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getAllNewsBlogsById(id: number) {
    try {
      const allNewsBlogs = await this.newsBlogRepo.findOne({ where: { id } });
      if (!allNewsBlogs) {
        return {
          success: false,
          message: `News/Blogs with ID ${id} not found`,
        };
      }
      const data = await this.newsBlogRepo.save(allNewsBlogs);
      return {
        success: true,
        message: "Fetch Data Successfully",
        data: data,
      };
    } catch (error) {
      return error;
    }
  }

  async updateNewsBlog(id: number, obj: NewsBlogsDTO) {
    try {
      const updatedData = await this.newsBlogRepo.findOne({ where: { id } });
      if (!updatedData) {
        return {
          success: false,
          message: `News/Blogs with ID ${id} not found`,
        };
      }
      this.newsBlogRepo.merge(updatedData, obj);
      const data = await this.newsBlogRepo.save(updatedData);
      return {
        success: true,
        message: "News/Blogs Updated Successfully.",
        data: data,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteNewsBlogs(id: number[]) {
    try {
      const deletedNewsBlog = await this.newsBlogRepo.findBy({
        id: In(id),
      });
      if (deletedNewsBlog.length === 0) {
        return {
          success: false,
          message: `News/Blogs With Id ${id} not found`,
        };
      }
      await this.newsBlogRepo.delete(id);
      return {
        success: true,
        message: `News/Blogs With Id ${id} Deleted Successfully`,
        data: deletedNewsBlog,
      };
    } catch (error) {
      return error;
    }
  }
}
