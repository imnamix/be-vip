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
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DeleteLocDTO } from "./entity/deleteLoc.dto";
import { ProjectLocationService } from "./projectLocation.service";
import { ProjectLocationDTO } from "./entity/projectLocation.dto";

@ApiTags("Project Location")
@Controller("projectLocation")
export class ProjectLocationController {
  constructor(public ProjectLocationService: ProjectLocationService) {}

  @Post("create")
  @ApiBody({ type: ProjectLocationDTO })
  async createProjectLocation(@Body() obj: ProjectLocationDTO) {
    try {
      const newLocation = await this.ProjectLocationService.create(obj);
      return {
        success: newLocation.success,
        message: newLocation.message,
        data: newLocation.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new project location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAllProjectLocation")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String }) //to make search optional
  async getAllProjectLocation(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string
  ) {
    try {
      const allLocations =
        await this.ProjectLocationService.getAllProjectLocations({
          page,
          limit,
          search,
        });
      return {
        success: true,
        message: "Project Location Fetched Successfully.",
        data: allLocations.data,
        count: allLocations.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching all project location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getProjectLocationById/:id")
  async getProjectById(@Param("id") id: number) {
    try {
      const projectLocation =
        await this.ProjectLocationService.getProjectLocById(id);

      if (!projectLocation) {
        return {
          success: false,
          message: "error while fetching project location",
        };
      }
      return {
        success: true,
        message: `Project Location with ID ${id} Fetch Successfully`,
        data: projectLocation,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching project location by ID",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("updateProjectLocation/:id")
  @ApiBody({ type: ProjectLocationDTO })
  async updateProjectLocation(
    @Param("id") id: number,
    @Body() obj: ProjectLocationDTO
  ) {
    try {
      const updatedLocation =
        await this.ProjectLocationService.updateProjectLocation(id, obj);

      return {
        success: updatedLocation.success,
        message: updatedLocation.message,
        data: updatedLocation.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating project location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("deleteProjectLocation")
  async deleteProjectLoc(@Body() deleteDTo: DeleteLocDTO) {
    try {
      const project = await this.ProjectLocationService.deleteProjectLocation(
        deleteDTo.ids
      );
      return {
        success: project.success,
        message: project.message,
        data: project.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting project location",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
