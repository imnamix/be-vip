import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Enquiry } from "./entity/enquiry.entity";
import { In, Like, Repository } from "typeorm";
import { EnquiryDTO } from "./entity/enquiry.dto";

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(EN_Enquiry)
    private readonly enquiryRepo: Repository<EN_Enquiry>
  ) {}

  async createEnquiry(payload: EnquiryDTO) {
    try {
      const newEnquiry = this.enquiryRepo.create(payload);
      const savedEnquiry = await this.enquiryRepo.save(newEnquiry);
      return {
        success: true,
        message: "Enquiry created successfully",
        data: savedEnquiry,
      };
    } catch (error) {
      return error;
    }
  }

  async getEnquiryById(id: number) {
    try {
      const enquiry = await this.enquiryRepo.findOne({ where: { id: Number(id) } });
      if (!enquiry) {
        throw new HttpException(`Enquiry ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return enquiry;
    } catch (error) {
      throw error;
    }
  }

  async updateEnquiry(id: number, payload: Partial<EN_Enquiry>) {
    try {
      await this.enquiryRepo.update(Number(id), payload);
      return await this.enquiryRepo.findOne({ where: { id: Number(id) } });
    } catch (error) {
      throw error;
    }
  }

  async getAllEnquiry(pagination: {
    page: number;
    limit: number;
    search: string;
    status?: string;
  }) {
    try {
      const { page, limit, search, status } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      let whereCondition: any = null;
      if (status && search) {
        whereCondition = [
          { name: Like(`%${search}%`), status },
          { mobile: Like(`%${search}%`), status },
        ];
      } else if (status) {
        whereCondition = { status };
      } else if (search) {
        whereCondition = [
          { name: Like(`%${search}%`) },
          { mobile: Like(`%${search}%`) },
        ];
      }

      const [data, total] = await this.enquiryRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: whereCondition,
      });
      if (!data) {
        throw new HttpException(
          "Unable to find Enquiries",
          HttpStatus.NOT_FOUND
        );
      }
      return {
        success: true,
        message: "Successfully fetched all Enquiries",
        data: data,
        count: total,
      };
    } catch (error) {
      return error;
    }
  }

  async getStatusCounts() {
    try {
      const results = await this.enquiryRepo
        .createQueryBuilder("e")
        .select("e.status", "status")
        .addSelect("COUNT(*)", "count")
        .groupBy("e.status")
        .getRawMany();

      const counts: Record<string, number> = {};
      let grandTotal = 0;
      for (const r of results) {
        const s = r.status || "Pending";
        counts[s] = parseInt(r.count, 10);
        grandTotal += counts[s];
      }
      counts["All"] = grandTotal;
      return { success: true, data: counts };
    } catch (error) {
      throw error;
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
