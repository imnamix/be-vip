import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from "@nestjs/common";

import { UserService } from "./user.service";

import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserDTO } from "./entity/user.dto";
import { UpdateUserDTO } from "./entity/update.dto";
import { deleteUserDTO } from "./entity/deleteUser.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(public service: UserService) {}

  @Post("create")
  @ApiBody({ type: UserDTO })
  async create(@Body() obj: UserDTO) {
    try {
      const user = await this.service.create(obj);
      return {
        success: user.success,
        message: user.message,
        data: user.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while adding new user",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  // @Roles(userRoles.SUPER_ADMIN)
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String }) //to make search optional
  async getAllUsers(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string
  ) {
    try {
      const allUsers = await this.service.getAllUsers({ page, limit, search });
      return {
        success: true,
        message: allUsers.message,
        data: allUsers.data,
        count: allUsers.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error fetching users",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    try {
      const user = await this.service.getUserById(id);
      return {
        success: true,
        message: `User with id ${id} fetched successfully`,
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: `Error while fetching user by id ${id}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  @ApiBody({ type: UpdateUserDTO })
  async update(@Param("id") id: number, @Body() updatedData: UpdateUserDTO) {
    try {
      const updatedUser = await this.service.updateUser(id, updatedData);
      return {
        success: updatedUser.success,
        message: updatedUser.message,
        data: updatedUser.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating user",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: deleteUserDTO })
  async delete(@Body() userDto: deleteUserDTO) {
    try {
      return await this.service.deleteUser(userDto.ids);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting user",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
