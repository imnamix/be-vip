import { EN_Events } from "./entity/events.entity";
import { Repository } from "typeorm";
import { EventsDTO } from "./entity/events.dto";
export declare class EventsService {
    private readonly eventsRepo;
    constructor(eventsRepo: Repository<EN_Events>);
    create(obj: EN_Events): Promise<any>;
    getEventsData(pagination: {
        page: number;
        limit: number;
        search: string;
        status?: string;
    }): Promise<any>;
    getEventById(id: number): Promise<any>;
    updateEventsData(id: number, obj: EventsDTO): Promise<any>;
    deleteEvents(id: number[]): Promise<any>;
}
