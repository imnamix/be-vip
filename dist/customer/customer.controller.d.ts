import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./entity/customer.dto";
import { DeleteCustomerDTO } from "./entity/deleteCustomer.dto";
export declare class CustomerController {
    customerService: CustomerService;
    constructor(customerService: CustomerService);
    create(payload: CustomerDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAllCustomers(page: number, limit: number, search: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getCustomerById(id: number): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    updateCustomer(id: number, payload: CustomerDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deleteCustomer(id: DeleteCustomerDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
