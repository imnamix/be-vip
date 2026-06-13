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
import { ClientsDTO } from "./entity/clients.dto";
import { ClientsService } from "./clients.service";
import { DeleteClientsDTO } from "./entity/deleteClients.dto";

@ApiTags("Clients")
@Controller("clients")
export class ClientsController {
  constructor(public clientsService: ClientsService) {}

  @Post("create")
  @ApiBody({ type: ClientsDTO })
  async create(@Body() payload: ClientsDTO) {
    try {
      const newData = await this.clientsService.createClient(payload);
      return {
        success: true,
        message: "New Record Added Successfully",
        data: newData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Adding New Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search?: string
  ) {
    try {
      const allData = await this.clientsService.getAllClientsData(
        {
          page,
          limit,
        },
        search
      );
      return {
        success: true,
        message: "Record Fetched Successfully",
        data: allData.data,
        count: allData.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      const clientData = await this.clientsService.getClientById(id);
      return clientData;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Fetching Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: ClientsDTO })
  async updateData(@Body() payload: ClientsDTO, @Param("id") id: number) {
    try {
      const updatedData = await this.clientsService.updateClient(id, payload);
      return {
        success: updatedData.success,
        message: updatedData.message,
        data: updatedData.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Updating Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteClientsDTO })
  async deleteClientData(@Body() id: DeleteClientsDTO) {
    try {
      const deletedData = await this.clientsService.deleteClient(id.ids);
      return {
        success: deletedData.success,
        message: deletedData.message,
        data: deletedData.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Deleting Data",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
