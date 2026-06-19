import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Project } from "./entity/project.entity";
import { In, Like, Repository } from "typeorm";
import { ProjectDTO } from "./entity/project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(EN_Project)
    private readonly projectRepo: Repository<EN_Project>,
  ) {}

  async createProject(projectObj: ProjectDTO) {
    try {
      // For BANNER type, provide default values for project-specific fields
      if (projectObj.type === "BANNER") {
        projectObj = {
          ...projectObj,
          name: projectObj.name || "",
          reraId: projectObj.reraId || "",
          headline: projectObj.headline || "",
          subHeadline: projectObj.subHeadline || "",
          tagline: projectObj.tagline || "",
          projectOverviewSection: projectObj.projectOverviewSection || [],
          locationAdvantage: projectObj.locationAdvantage || [],
          projectWalkthrough: projectObj.projectWalkthrough || [],
          availableOptions: projectObj.availableOptions || [],
          projectSpecification: projectObj.projectSpecification || [],
          amenities: projectObj.amenities || [],
          gallery: projectObj.gallery || [],
          masterPlan: projectObj.masterPlan || [],
          floorPlan: projectObj.floorPlan || [],
          location: projectObj.location || "",
        };
      }

      const newProject = this.projectRepo.create(
        projectObj as Partial<EN_Project>,
      );
      return await this.projectRepo.save(newProject);
    } catch (error) {
      return error;
    }
  }

  async getAllProjects(pagination: {
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

      const [projects, total] = await this.projectRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: search ? [{ name: Like(`%${search}%`) }] : null,
      });
      return {
        count: total,
        data: projects,
      };
    } catch (error) {
      return error;
    }
  }

  async getProjectById(id: number) {
    try {
      const project = await this.projectRepo.findOne({ where: { id } });

      if (!project) {
        throw new HttpException("project not found", HttpStatus.NOT_FOUND);
      }
      return project;
    } catch (error) {
      return error;
    }
  }

  async updateProject(id: number, updatedData: ProjectDTO) {
    try {
      const project = await this.projectRepo.findOne({ where: { id } });

      // For BANNER type, provide default values for project-specific fields
      if (updatedData.type === "BANNER") {
        updatedData = {
          ...updatedData,
          name: updatedData.name || "",
          reraId: updatedData.reraId || "",
          headline: updatedData.headline || "",
          subHeadline: updatedData.subHeadline || "",
          tagline: updatedData.tagline || "",
          projectOverviewSection: updatedData.projectOverviewSection || [],
          locationAdvantage: updatedData.locationAdvantage || [],
          projectWalkthrough: updatedData.projectWalkthrough || [],
          availableOptions: updatedData.availableOptions || [],
          projectSpecification: updatedData.projectSpecification || [],
          amenities: updatedData.amenities || [],
          gallery: updatedData.gallery || [],
          masterPlan: updatedData.masterPlan || [],
          floorPlan: updatedData.floorPlan || [],
          location: updatedData.location || "",
        };
      }

      this.projectRepo.merge(project, updatedData);
      return await this.projectRepo.save(project);
    } catch (error) {
      return error;
    }
  }

  async deleteProject(id: number[]) {
    try {
      const deletedProject = await this.projectRepo.findBy({ id: In(id) });
      if (deletedProject.length == 0) {
        throw new HttpException("Project not found", HttpStatus.NOT_FOUND);
      }
      await this.projectRepo.delete(id);
      return deletedProject;
    } catch (error) {
      return error;
    }
  }
}
