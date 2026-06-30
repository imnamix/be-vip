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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './entity/customer.dto';
import { DeleteCustomerDTO } from './entity/deleteCustomer.dto';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags('Customers')
@Controller('customers')
@UseGuards(AuthGuard, PermissionGuard)
export class CustomerController {
  constructor(public customerService: CustomerService) {}

  @Post('create')
  @Permission('Customers', 'write')
  @ApiBody({ type: CustomerDTO })
  async create(@Body() payload: CustomerDTO) {
    try {
      const newCustomer = await this.customerService.createCustomer(payload);
      return {
        success: true,
        message: "Customer Added successfully",
        data: newCustomer,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Adding New Customer",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get('getAllCustomers')
  @Permission('Customers', 'read')
  @ApiQuery({ name: 'page',   required: false, type: Number })
  @ApiQuery({ name: 'limit',  required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAllCustomers(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string
  ) {
    try {
      const allCustomers = await this.customerService.getAllCustomer({
        page,
        limit,
        search,
      });
      return {
        success: true,
        message: "Customer Details Fetched Successfully",
        data: allCustomers.data,
        count: allCustomers.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Customers",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('getCustomerById/:id')
  @Permission('Customers', 'read')
  async getCustomerById(@Param("id") id: number) {
    try {
      const customer = await this.customerService.getCustomerById(id);
      return {
        success: customer.success,
        message: customer.message,
        data: customer.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Customer",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('updateCustomer/:id')
  @Permission('Customers', 'update')
  async updateCustomer(@Param("id") id: number, @Body() payload: CustomerDTO) {
    try {
      const customer = await this.customerService.updateCustomer(id, payload);
      return {
        success: customer.success,
        message: customer.message,
        data: customer.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Updating Customer",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('deleteCustomer')
  @Permission('Customers', 'delete')
  @ApiBody({ type: DeleteCustomerDTO })
  async deleteCustomer(@Body() id: DeleteCustomerDTO) {
    try {
      const customer = await this.customerService.deleteCustomer(id.ids);
      return {
        success: customer.success,
        message: customer.message,
        data: customer.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Deleting Customer",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
