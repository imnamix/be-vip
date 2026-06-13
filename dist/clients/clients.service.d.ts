import { EN_Clients } from "./entity/clients.entity";
import { Repository } from "typeorm";
import { ClientsDTO } from "./entity/clients.dto";
export declare class ClientsService {
    private readonly clientsRepo;
    constructor(clientsRepo: Repository<EN_Clients>);
    createClient(payload: ClientsDTO): Promise<any>;
    getAllClientsData(pagination: {
        page: number;
        limit: number;
    }, search?: string): Promise<any>;
    getClientById(id: number): Promise<any>;
    updateClient(id: number, payload: ClientsDTO): Promise<any>;
    deleteClient(id: number[]): Promise<any>;
}
