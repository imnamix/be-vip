import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectDTO } from "./entity/project.dto";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DeleteProjectDTO } from "./entity/deleteProject.dto";

@ApiTags("Project")
@Controller("project")
export class ProjectController {
  constructor(public projectService: ProjectService) {}

  //create new project
  @Post("createProject")
  @ApiBody({ type: ProjectDTO })
  async create(@Body() projectObj: ProjectDTO) {
    try {
      const newProject = await this.projectService.createProject(projectObj);
      return {
        succcess: true,
        message: "Project Added Successfully",
        data: newProject,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new project",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //to get all projects
  @Get("getAllProjects")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String }) //to make search optional
  async getAllProjects(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search?: string
  ) {
    try {
      const allProjects = await this.projectService.getAllProjects({
        page,
        limit,
        search,
      });
      return {
        success: true,
        message: "All Projects Fetched Successfully",
        data: allProjects.data,
        count: allProjects.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching all projects",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //get project by id
  @Get("/getProject/:id")
  async getProjectById(@Param("id") id: number) {
    try {
      const project = await this.projectService.getProjectById(id);

      return {
        success: true,
        message: "Project Fetch Successfully",
        data: project,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching all projects",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //update project
  @Put("updateProject/:id")
  @ApiBody({ type: ProjectDTO })
  async updateProject(@Param("id") id: number, @Body() projectObj: ProjectDTO) {
    try {
      const updatedProject = await this.projectService.updateProject(
        id,
        projectObj
      );
      return {
        success: true,
        message: "Project updated successfully",
        data: updatedProject,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating project",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //delete project
  @Delete("delete")
  @ApiBody({ type: DeleteProjectDTO })
  async deleteProject(@Body() delteDTO: DeleteProjectDTO) {
    try {
      const deletedProject = await this.projectService.deleteProject(
        delteDTO.ids
      );
      return {
        success: true,
        message: "Project Deleted Successfully",
        data: deletedProject,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting project",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
