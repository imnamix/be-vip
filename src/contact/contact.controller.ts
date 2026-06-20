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
import { ContactService } from "./contact.service";
import { ContactDTO, DeleteContactDTO } from "./entity/contact.dto";

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post("create")
  @ApiBody({ type: ContactDTO })
  async create(@Body() payload: ContactDTO) {
    try {
      const newData = await this.contactService.createContact(payload);
      return { success: true, message: "Contact created successfully", data: newData };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while adding contact", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
  ) {
    try {
      const result = await this.contactService.getAllContacts({ page, limit });
      return { success: true, message: "Records fetched successfully", data: result.data, count: result.count };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching contacts", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      return await this.contactService.getContactById(id);
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching contact", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put("update/:id")
  @ApiBody({ type: ContactDTO })
  async update(@Param("id") id: number, @Body() payload: ContactDTO) {
    try {
      const result = await this.contactService.updateContact(id, payload);
      return { success: result.success, message: result.message, data: result.data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while updating contact", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteContactDTO })
  async delete(@Body() body: DeleteContactDTO) {
    try {
      const result = await this.contactService.deleteContact(body.ids);
      return { success: result.success, message: result.message, data: result.data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while deleting contact", error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
