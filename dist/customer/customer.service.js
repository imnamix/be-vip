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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entity/customer.entity");
const typeorm_2 = require("typeorm");
let CustomerService = class CustomerService {
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    async createCustomer(payload) {
        try {
            const newCustomer = this.customerRepo.create(payload);
            return await this.customerRepo.save(newCustomer);
        }
        catch (error) {
            return error;
        }
    }
    async getAllCustomer(pagination) {
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
                where: search ? [{ name: (0, typeorm_2.Like)(`%${search}%`) }] : null,
            });
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getCustomerById(id) {
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
        }
        catch (error) {
            return error;
        }
    }
    async updateCustomer(id, payload) {
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
        }
        catch (error) {
            return error;
        }
    }
    async deleteCustomer(id) {
        try {
            const existingCustomer = await this.customerRepo.findBy({
                id: (0, typeorm_2.In)(id),
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
        }
        catch (error) {
            return error;
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.EN_Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map