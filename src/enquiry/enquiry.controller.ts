import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
  async getAllEnquiry(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1000,
    @Query("search") search: string
  ) {
    try {
      const allData = await this.enquiryService.getAllEnquiry({
        page,
        limit,
        search,
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
