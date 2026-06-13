"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clients_entity_1 = require("./entity/clients.entity");
const typeorm_2 = require("typeorm");
let ClientsService = class ClientsService {
    constructor(clientsRepo) {
        this.clientsRepo = clientsRepo;
    }
    async createClient(payload) {
        try {
            const newClient = this.clientsRepo.create(payload);
            return await this.clientsRepo.save(newClient);
        }
        catch (error) {
            return error;
        }
    }
    async getAllClientsData(pagination, search) {
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
                query = query.where("clients.clientName LIKE :search OR clients.description LIKE :search", { search: `%${search}%` });
            }
            const [data, total] = await query
                .orderBy("clients.created_at", "DESC")
                .take(pageSize)
                .skip(skip)
                .getManyAndCount();
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getClientById(id) {
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
        }
        catch (error) {
            return error;
        }
    }
    async updateClient(id, payload) {
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
        }
        catch (error) {
            return error;
        }
    }
    async deleteClient(id) {
        try {
            const existingData = await this.clientsRepo.findBy({ id: (0, typeorm_2.In)(id) });
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
        }
        catch (error) {
            return error;
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clients_entity_1.EN_Clients)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map