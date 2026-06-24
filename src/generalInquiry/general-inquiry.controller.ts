import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { GeneralInquiryService } from "./general-inquiry.service";
import { DeleteGeneralInquiryDTO, GeneralInquiryDTO } from "./entity/general-inquiry.dto";

@ApiTags("general-inquiry")
@Controller("generalInquiry")
export class GeneralInquiryController {
  constructor(private readonly service: GeneralInquiryService) {}

  @Post("create")
  @ApiBody({ type: GeneralInquiryDTO })
  async create(@Body() payload: GeneralInquiryDTO) {
    try {
      const result = await this.service.create(payload);
      return { success: true, message: "Inquiry submitted successfully.", data: result };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while submitting inquiry", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getAll")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "status", required: false, type: String })
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("search") search?: string,
    @Query("status") status?: string
  ) {
    try {
      const result = await this.service.getAll({ page, limit, search, status });
      return { success: true, message: result.message, data: result.data, count: result.count };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching inquiries", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getById/:id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.service.getById(id);
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while fetching inquiry", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch("update/:id")
  @ApiBody({ type: GeneralInquiryDTO })
  async update(@Param("id") id: number, @Body() payload: Partial<GeneralInquiryDTO>) {
    try {
      const data = await this.service.update(id, payload);
      return { success: true, message: "Inquiry updated successfully", data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while updating inquiry", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteGeneralInquiryDTO })
  async delete(@Body() body: DeleteGeneralInquiryDTO) {
    try {
      const result = await this.service.delete(body.ids);
      return { success: result.success, message: result.message, data: result.data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error while deleting inquiry", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
