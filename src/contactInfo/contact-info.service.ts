import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_ContactInfo } from "./entity/contact-info.entity";
import { Repository } from "typeorm";
import { CreateContactInfoDto } from "./dto/create-contact-info.dto";

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(EN_ContactInfo)
    private readonly contactInfoRepo: Repository<EN_ContactInfo>,
  ) {}

  async create(obj: CreateContactInfoDto) {
    try {
      const newData = this.contactInfoRepo.create(obj);
      return await this.contactInfoRepo.save(newData);
    } catch (error) {
      return error;
    }
  }

  async getAll(status?: string) {
    try {
      let whereCondition: any = undefined;
      if (status === "active") {
        whereCondition = { status: 1 };
      } else if (!status) {
        whereCondition = { status: 1 }; // default to active
      }
      const data = await this.contactInfoRepo.find({
        where: whereCondition,
        order: { created_at: "DESC" },
      });
      return {
        success: true,
        message: "Contact info fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching contact info",
        error: error,
      };
    }
  }

  async getById(id: number) {
    try {
      const data = await this.contactInfoRepo.findOne({
        where: { id, status: 1 },
      });
      if (!data) {
        return {
          success: false,
          message: `Contact info with id ${id} not found`,
          data: null,
        };
      }
      return {
        success: true,
        message: "Contact info fetched successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while fetching contact info",
        error: error,
      };
    }
  }

  async update(id: number, obj: CreateContactInfoDto) {
    try {
      let contactInfo = await this.contactInfoRepo.findOne({
        where: { id },
      });

      if (!contactInfo) {
        return {
          success: false,
          message: `Contact info with id ${id} not found`,
        };
      }

      const updatedContactInfo = Object.assign(contactInfo, obj);
      const data = await this.contactInfoRepo.save(updatedContactInfo);

      return {
        success: true,
        message: "Contact info updated successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating contact info",
        error: error,
      };
    }
  }

  async delete(id: number) {
    try {
      const contactInfo = await this.contactInfoRepo.findOne({
        where: { id },
      });

      if (!contactInfo) {
        return {
          success: false,
          message: `Contact info with id ${id} not found`,
        };
      }

      await this.contactInfoRepo.remove(contactInfo);

      return {
        success: true,
        message: "Contact info deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting contact info",
        error: error,
      };
    }
  }
}
