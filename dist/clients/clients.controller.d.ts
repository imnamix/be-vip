import { ClientsDTO } from "./entity/clients.dto";
import { ClientsService } from "./clients.service";
import { DeleteClientsDTO } from "./entity/deleteClients.dto";
export declare class ClientsController {
    clientsService: ClientsService;
    constructor(clientsService: ClientsService);
    create(payload: ClientsDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAll(page?: number, limit?: number, search?: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<any>;
    updateData(payload: ClientsDTO, id: number): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    deleteClientData(id: DeleteClientsDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
