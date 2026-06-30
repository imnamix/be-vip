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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDTO } from './entity/user.dto';
import { UpdateUserDTO } from './entity/update.dto';
import { deleteUserDTO } from './entity/deleteUser.dto';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard, PermissionGuard)
export class UserController {
  constructor(public service: UserService) {}

  @Post('create')
  @Permission('Users', 'write')
  @ApiBody({ type: UserDTO })
  async create(@Body() obj: UserDTO) {
    try {
      const user = await this.service.create(obj);
      return { success: user.success, message: user.message, data: user.data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while adding new user', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @Permission('Users', 'read')
  @ApiQuery({ name: 'page',   required: false, type: Number })
  @ApiQuery({ name: 'limit',  required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAllUsers(
    @Query('page')   page: number  = 1,
    @Query('limit')  limit: number = 1000,
    @Query('search') search: string,
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
        { success: false, message: 'Error fetching users', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @Permission('Users', 'read')
  async getById(@Param('id') id: number) {
    try {
      const user = await this.service.getUserById(id);
      return { success: true, message: `User ${id} fetched successfully`, data: user };
    } catch (error) {
      throw new HttpException(
        { success: false, message: `Error fetching user ${id}`, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @Permission('Users', 'update')
  @ApiBody({ type: UpdateUserDTO })
  async update(@Param('id') id: number, @Body() updatedData: UpdateUserDTO) {
    try {
      const updatedUser = await this.service.updateUser(id, updatedData);
      return { success: updatedUser.success, message: updatedUser.message, data: updatedUser.data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while updating user', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('change-password/:id')
  @Permission('Users', 'update')
  async changePassword(
    @Param('id') id: number,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    try {
      return await this.service.changePassword(id, body.currentPassword, body.newPassword);
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message || 'Error changing password' },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete')
  @Permission('Users', 'delete')
  @ApiBody({ type: deleteUserDTO })
  async delete(@Body() userDto: deleteUserDTO) {
    try {
      return await this.service.deleteUser(userDto.ids);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Error while deleting user', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
