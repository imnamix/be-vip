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
import { ContactInfoService } from "./contact-info.service";
import { CreateContactInfoDto } from "./dto/create-contact-info.dto";

@ApiTags("Contact Info")
@Controller("contact-info")
export class ContactInfoController {
  constructor(public contactInfoService: ContactInfoService) {}

  @Post("create")
  @ApiBody({ type: CreateContactInfoDto })
  async create(@Body() payload: CreateContactInfoDto) {
    try {
      const data = await this.contactInfoService.create(payload);
      return {
        success: true,
        message: "Contact info created successfully.",
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while creating contact info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "status", required: false, type: String })
  async getAll(@Query("status") status: string) {
    try {
      const data = await this.contactInfoService.getAll(status);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching contact info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.contactInfoService.getById(id);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while fetching contact info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put("update/:id")
  async update(@Param("id") id: number, @Body() payload: CreateContactInfoDto) {
    try {
      const data = await this.contactInfoService.update(id, payload);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while updating contact info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    try {
      const data = await this.contactInfoService.delete(id);
      if (!data.success) {
        throw new HttpException(
          {
            success: false,
            message: data.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error while deleting contact info",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
