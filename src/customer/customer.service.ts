import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Customer } from "./entity/customer.entity";
import { In, Like, Repository } from "typeorm";
import { CustomerDTO } from "./entity/customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(EN_Customer)
    private readonly customerRepo: Repository<EN_Customer>
  ) {}

  async createCustomer(payload: CustomerDTO) {
    try {
      const newCustomer = this.customerRepo.create(payload);
      return await this.customerRepo.save(newCustomer);
    } catch (error) {
      return error;
    }
  }

  async getAllCustomer(pagination: {
    page: number;
    limit: number;
    search: string;
  }) {
    try {
      const { page, limit, search } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      const [data, total] = await this.customerRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: search ? [{ name: Like(`%${search}%`) }] : null,
      });
      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getCustomerById(id: number) {
    try {
      const customer = await this.customerRepo.findOne({ where: { id } });
      if (!customer) {
        return {
          success: false,
          message: `Error While Fetching Customer With ID ${id}`,
        };
      }
      return {
        success: true,
        message: `Successfully Fetch Customer`,
        data: customer,
      };
    } catch (error) {
      return error;
    }
  }

  async updateCustomer(id: number, payload: CustomerDTO) {
    try {
      const existingCustomer = await this.customerRepo.findOne({
        where: { id },
      });
      if (!existingCustomer) {
        return {
          success: false,
          message: `Error While Updating Customer, ID ${id} Not Found`,
        };
      }
      this.customerRepo.merge(existingCustomer, payload);
      const updatedCustomer = await this.customerRepo.save(existingCustomer);
      return {
        success: true,
        message: "Customer Updated Successfully",
        data: updatedCustomer,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteCustomer(id: number[]) {
    try {
      const existingCustomer = await this.customerRepo.findBy({
        id: In(id),
      });
      if (existingCustomer.length === 0) {
        return {
          success: false,
          message: `Error While Deleting Customer, ID ${id} Not Found`,
        };
      }
      await this.customerRepo.delete(id);
      return {
        success: true,
        message: "Customer Deleted Successfully",
        data: existingCustomer,
      };
    } catch (error) {
      return error;
    }
  }
}
