import { EN_Customer } from "./entity/customer.entity";
import { Repository } from "typeorm";
import { CustomerDTO } from "./entity/customer.dto";
export declare class CustomerService {
    private readonly customerRepo;
    constructor(customerRepo: Repository<EN_Customer>);
    createCustomer(payload: CustomerDTO): Promise<any>;
    getAllCustomer(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    getCustomerById(id: number): Promise<any>;
    updateCustomer(id: number, payload: CustomerDTO): Promise<any>;
    deleteCustomer(id: number[]): Promise<any>;
}
