import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { EN_Contact } from "./entity/contact.entity";
import { ContactDTO } from "./entity/contact.dto";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(EN_Contact)
    private readonly contactRepo: Repository<EN_Contact>,
  ) {}

  async createContact(payload: ContactDTO) {
    try {
      const newContact = this.contactRepo.create(payload);
      return await this.contactRepo.save(newContact);
    } catch (error) {
      return error;
    }
  }

  async getAllContacts(pagination: { page: number; limit: number }) {
    try {
      const { page, limit } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }
      const [data, total] = await this.contactRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
      });
      return { data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getContactById(id: number) {
    try {
      const contact = await this.contactRepo.findOne({ where: { id } });
      if (!contact) {
        return { success: false, message: `Contact with ID ${id} not found` };
      }
      return { success: true, message: "Data fetched successfully", data: contact };
    } catch (error) {
      return error;
    }
  }

  async updateContact(id: number, payload: ContactDTO) {
    try {
      const contact = await this.contactRepo.findOne({ where: { id } });
      if (!contact) {
        return { success: false, message: `Contact with ID ${id} not found` };
      }
      this.contactRepo.merge(contact, payload);
      const updated = await this.contactRepo.save(contact);
      return { success: true, message: "Record updated successfully", data: updated };
    } catch (error) {
      return error;
    }
  }

  async deleteContact(ids: number[]) {
    try {
      const existing = await this.contactRepo.findBy({ id: In(ids) });
      if (existing.length === 0) {
        return { success: false, message: `No records found for IDs: ${ids}` };
      }
      await this.contactRepo.delete(ids);
      return { success: true, message: "Record deleted successfully", data: existing };
    } catch (error) {
      return error;
    }
  }
}
