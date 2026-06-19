import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Enquiry } from "./entity/enquiry.entity";
import { In, Like, Repository } from "typeorm";
import { EnquiryDTO } from "./entity/enquiry.dto";
import { EmailService } from "../EmailService/mailService";

@Injectable()
export class EnquiryService {
   constructor(
    @InjectRepository(EN_Enquiry)
    private readonly enquiryRepo: Repository<EN_Enquiry>,
    private readonly emailService: EmailService // 👈 add this
  ) {}

async createEnquiry(payload: EnquiryDTO) {
  try {
    const newEnquiry = this.enquiryRepo.create(payload);
    const savedEnquiry = await this.enquiryRepo.save(newEnquiry);

    const adminEmail = process.env.ADMIN_EMAIL;

    await this.emailService.sendEnquiryEmail(adminEmail, savedEnquiry);

    return {
      success: true,
      message: "Enquiry created successfully",
      data: savedEnquiry,
    };
  } catch (error) {
    return error;
  }
}

  async getAllEnquiry(pagination: {
    page: number;
    limit: number;
    search: string;
  }) {
    try {
      // const allData = await this.enquiryRepo.find();
      const { page, limit, search } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      const [data, total] = await this.enquiryRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: search
          ? [
              { name: Like(`%${search}%`) },
              // { email: Like(`%${search}%`) },
              { mobile: Like(`%${search}%`) },
            ]
          : null,
      });
      if (!data) {
        throw new HttpException(
          "Enble to find Enquiries",
          HttpStatus.NOT_FOUND
        );
      }
      return {
        success: true,
        message: "Successfully fetch all Enquiries",
        data: data,
        count: total,
      };
    } catch (error) {
      return error;
    }
  }
  async deleteEnquiry(id: number[]) {
    try {
      const deleteEnquiry = await this.enquiryRepo.findBy({ id: In(id) });
      if (deleteEnquiry.length === 0) {
        throw new HttpException(`Id ${id} not found`, HttpStatus.NOT_FOUND);
      }
      await this.enquiryRepo.delete(id);
      return {
        success: true,
        message: "Enquiry deleted successfully",
        data: deleteEnquiry,
      };
    } catch (error) {
      return error;
    }
  }
}
