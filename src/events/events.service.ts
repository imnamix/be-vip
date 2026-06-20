import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EN_Events } from "./entity/events.entity";
import { In, Like, Repository } from "typeorm";
import { EventsDTO } from "./entity/events.dto";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EN_Events)
    private readonly eventsRepo: Repository<EN_Events>,
  ) {}

  async create(obj: EN_Events) {
    try {
      const newData = this.eventsRepo.create(obj);
      return await this.eventsRepo.save(newData);
    } catch (error) {
      return error;
    }
  }

  async getEventsData(pagination: {
    page: number;
    limit: number;
    search: string;
    status?: string;
  }) {
    try {
      const { page, limit, search, status } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      const whereCondition: any = {};
      if (search) whereCondition.title = Like(`%${search}%`);
      if (status && status !== "All") whereCondition.eventStatus = status;

      const [data, total] = await this.eventsRepo.findAndCount({
        take: pageSize,
        skip: skip,
        order: { created_at: "DESC" },
        where: Object.keys(whereCondition).length ? whereCondition : undefined,
      });
      return { data: data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getEventById(id: number) {
    try {
      const eventData = await this.eventsRepo.findOne({ where: { id } });
      if (!eventData) {
        return {
          success: false,
          message: `Failed to get event data, id ${id} not found`,
        };
      }
      return {
        success: true,
        message: "Data Fetch Successfully",
        data: eventData,
      };
    } catch (error) {
      return error;
    }
  }

  async updateEventsData(id: number, obj: EventsDTO) {
    try {
      const updateEvent = await this.eventsRepo.findOne({
        where: { id },
      });

      if (!updateEvent) {
        return {
          success: false,
          message: `ID ${id} Not Found`,
        };
      }
      this.eventsRepo.merge(updateEvent, obj);
      await this.eventsRepo.save(updateEvent);
      return {
        success: true,
        message: "Event Updated Successfully.",
        data: updateEvent,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteEvents(id: number[]) {
    try {
      const deletedData = await this.eventsRepo.findBy({
        id: In(id),
      });
      if (deletedData.length === 0) {
        return {
          success: false,
          message: "No Events found to delete",
        };
      }
      await this.eventsRepo.remove(deletedData);
      return {
        success: true,
        message: "Event(s) Deleted Successfully",
        data: deletedData,
      };
    } catch (error) {
      return error;
    }
  }
}
