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
import { RolesService } from "./roles.service";
import { CreateRoleDTO, UpdateRoleDTO, DeleteRoleDTO } from "./entity/role.dto";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post("create")
  @ApiBody({ type: CreateRoleDTO })
  async create(@Body() dto: CreateRoleDTO) {
    try {
      const result = await this.rolesService.create(dto);
      return result;
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while creating role", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page",   required: false, type: Number })
  @ApiQuery({ name: "limit",  required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  async getAll(
    @Query("page")   page: number  = 1,
    @Query("limit")  limit: number = 100,
    @Query("search") search: string
  ) {
    try {
      return await this.rolesService.getAll({ page, limit, search });
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching roles", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      return await this.rolesService.getById(id);
    } catch (error) {
      throw new HttpException(
        { success: false, message: `Error while fetching role with id ${id}`, error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("updateRole/:id")
  @ApiBody({ type: UpdateRoleDTO })
  async update(@Param("id") id: number, @Body() dto: UpdateRoleDTO) {
    try {
      return await this.rolesService.update(id, dto);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while updating role", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("deleteRole")
  @ApiBody({ type: DeleteRoleDTO })
  async delete(@Body() dto: DeleteRoleDTO) {
    try {
      return await this.rolesService.delete(dto.ids);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while deleting role(s)", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
