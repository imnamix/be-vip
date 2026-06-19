import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Clients } from "./entity/clients.entity";
import { In, Repository } from "typeorm";
import { ClientsDTO } from "./entity/clients.dto";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(EN_Clients)
    private readonly clientsRepo: Repository<EN_Clients>
  ) {}

  async createClient(payload: ClientsDTO) {
    try {
      const newClient = this.clientsRepo.create(payload);
      return await this.clientsRepo.save(newClient);
    } catch (error) {
      return error;
    }
  }

  async getAllClientsData(pagination: { page: number; limit: number }, search?: string) {
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

      let query = this.clientsRepo.createQueryBuilder("clients");

      if (search) {
        query = query.where(
          "clients.clientName LIKE :search OR clients.description LIKE :search",
          { search: `%${search}%` }
        );
      }

      const [data, total] = await query
        .orderBy("clients.created_at", "DESC")
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getClientById(id: number) {
    try {
      const clientData = await this.clientsRepo.findOne({ where: { id } });
      if (!clientData) {
        return {
          success: false,
          message: `Failed to get client data, ID ${id} not found`,
        };
      }
      return {
        success: true,
        message: "Data Fetch Successfully",
        data: clientData,
      };
    } catch (error) {
      return error;
    }
  }

  async updateClient(id: number, payload: ClientsDTO) {
    try {
      const clientData = await this.clientsRepo.findOne({ where: { id } });
      if (!clientData) {
        return {
          success: false,
          message: `Failed to update, ID ${id} not found`,
        };
      }
      this.clientsRepo.merge(clientData, payload);
      const updatedData = await this.clientsRepo.save(clientData);
      return {
        success: true,
        message: "Record Updated Successfully",
        data: updatedData,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteClient(id: number[]) {
    try {
      const existingData = await this.clientsRepo.findBy({ id: In(id) });
      if (existingData.length === 0) {
        return {
          success: false,
          message: `Failed to delete, ID ${id} not found`,
        };
      }
      await this.clientsRepo.delete(id);
      return {
        success: true,
        message: "Record Deleted Successfully",
        data: existingData,
      };
    } catch (error) {
      return error;
    }
  }
}
