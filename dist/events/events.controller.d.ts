import { EventsDTO } from "./entity/events.dto";
import { EventsService } from "./events.service";
import { DeleteEventDTO } from "./entity/events.dto";
export declare class EventsController {
    eventsService: EventsService;
    constructor(eventsService: EventsService);
    create(payload: EventsDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAllData(page: number, limit: number, search: string, status: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<any>;
    updateEvents(id: number, payload: EventsDTO): Promise<any>;
    deleteEvent(payload: DeleteEventDTO): Promise<any>;
}
