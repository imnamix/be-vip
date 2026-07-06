import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Enquiry } from "./entity/enquiry.entity";
import { Between, In, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from "typeorm";
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
      if (
        payload.status === "Dispatched" ||
        payload.status === "Delivered" ||
        payload.status === "Cancelled"
      ) {
        const existing = await this.enquiryRepo.findOne({ where: { id: Number(id) } });
        if (!existing) {
          throw new HttpException(`Enquiry ${id} not found`, HttpStatus.NOT_FOUND);
        }

        if (payload.status === "Dispatched") {
          const partnerName   = payload.deliveryPartnerName   ?? existing.deliveryPartnerName;
          const partnerMobile = payload.deliveryPartnerMobile ?? existing.deliveryPartnerMobile;
          const deliveryDate  = payload.expectedDeliveryDate  ?? existing.expectedDeliveryDate;
          const deliveryAddr  = payload.deliveryAddress       ?? existing.deliveryAddress;

          if (!partnerName || !partnerMobile || !deliveryDate || !deliveryAddr) {
            throw new HttpException(
              "Delivery partner name, mobile number, expected delivery date and delivery address are required to mark an order as Dispatched",
              HttpStatus.BAD_REQUEST,
            );
          }

          if (!existing.deliveryId) {
            payload.deliveryId = `DEL${String(id).padStart(5, "0")}`;
          }
        }

        if (payload.status === "Delivered" && !payload.deliveredDate && !existing.deliveredDate) {
          payload.deliveredDate = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
        }

        if (payload.status === "Cancelled") {
          const reason = payload.cancelReason ?? existing.cancelReason;
          if (!reason) {
            throw new HttpException(
              "A cancellation reason is required to mark an order as Cancelled",
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }

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
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const { page, limit, search, status, startDate, endDate } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      const statusList = status
        ? status.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const statusFilter: any =
        statusList.length > 1 ? In(statusList) : statusList[0];

      let dateFilter: any = null;
      if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter = Between(start, end);
      } else if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        dateFilter = MoreThanOrEqual(start);
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter = LessThanOrEqual(end);
      }

      const baseFilter: any = {};
      if (statusFilter) baseFilter.status = statusFilter;
      if (dateFilter) baseFilter.created_at = dateFilter;
      const hasBaseFilter = Object.keys(baseFilter).length > 0;

      const SEARCHABLE_FIELDS = [
        "name",
        "mobile",
        "deliveryId",
        "confirmedNumber",
        "vipNumber",
        "deliveryPartnerName",
        "deliveryPartnerMobile",
      ] as const;

      let whereCondition: any = null;
      if (hasBaseFilter && search) {
        whereCondition = SEARCHABLE_FIELDS.map((field) => ({
          [field]: Like(`%${search}%`),
          ...baseFilter,
        }));
      } else if (hasBaseFilter) {
        whereCondition = baseFilter;
      } else if (search) {
        whereCondition = SEARCHABLE_FIELDS.map((field) => ({
          [field]: Like(`%${search}%`),
        }));
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
