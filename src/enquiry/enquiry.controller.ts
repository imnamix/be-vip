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
import { EnquiryService } from "./enquiry.service";
import { DeleteEnquiryDTO, EnquiryDTO } from "./entity/enquiry.dto";

@ApiTags("enquiry")
@Controller("enquiry")
export class EnquiryController {
  constructor(public enquiryService: EnquiryService) {}

  @Post("create")
  @ApiBody({ type: EnquiryDTO })
  async create(@Body() payload: EnquiryDTO) {
    try {
      const newEnquiry = await this.enquiryService.createEnquiry(payload);
      return {
        success: true,
        message: "Enquiry send successfully.",
        data: newEnquiry,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While Sending New Enquiry",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("allEnquiries")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "status", required: false, type: String })
  async getAllEnquiry(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("search") search: string,
    @Query("status") status: string
  ) {
    try {
      const allData = await this.enquiryService.getAllEnquiry({
        page,
        limit,
        search,
        status,
      });

      return {
        success: allData.success,
        message: allData.message,
        data: allData.data,
        count: allData.count,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While fetching Enquires",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("statusCounts")
  async getStatusCounts() {
    try {
      return await this.enquiryService.getStatusCounts();
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error fetching status counts", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    try {
      const data = await this.enquiryService.getEnquiryById(id);
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error fetching enquiry", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch("update/:id")
  @ApiBody({ type: EnquiryDTO })
  async update(@Param("id") id: number, @Body() payload: Partial<EnquiryDTO>) {
    try {
      const data = await this.enquiryService.updateEnquiry(id, payload);
      return { success: true, message: "Enquiry updated successfully", data };
    } catch (error) {
      throw new HttpException(
        { success: false, message: "Error updating enquiry", error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  @ApiBody({ type: DeleteEnquiryDTO })
  async deleteEnquiry(@Body() id: DeleteEnquiryDTO) {
    try {
      const data = await this.enquiryService.deleteEnquiry(id.ids);
      return {
        success: data.success,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Error While fetching Enquires",
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
