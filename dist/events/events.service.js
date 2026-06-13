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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const events_entity_1 = require("./entity/events.entity");
const typeorm_2 = require("typeorm");
let EventsService = class EventsService {
    constructor(eventsRepo) {
        this.eventsRepo = eventsRepo;
    }
    async create(obj) {
        try {
            const newData = this.eventsRepo.create(obj);
            return await this.eventsRepo.save(newData);
        }
        catch (error) {
            return error;
        }
    }
    async getEventsData(pagination) {
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
            let whereCondition = null;
            if (status === "active") {
                whereCondition = search
                    ? [{ title: (0, typeorm_2.Like)(`%${search}%`), status: 1 }]
                    : { status: 1 };
            }
            else {
                whereCondition = search ? [{ title: (0, typeorm_2.Like)(`%${search}%`) }] : null;
            }
            const [data, total] = await this.eventsRepo.findAndCount({
                take: pageSize,
                skip: skip,
                order: { created_at: "DESC" },
                where: whereCondition,
            });
            return { data: data, count: total };
        }
        catch (error) {
            return error;
        }
    }
    async getEventById(id) {
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
        }
        catch (error) {
            return error;
        }
    }
    async updateEventsData(id, obj) {
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
        }
        catch (error) {
            return error;
        }
    }
    async deleteEvents(id) {
        try {
            const deletedData = await this.eventsRepo.findBy({
                id: (0, typeorm_2.In)(id),
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
        }
        catch (error) {
            return error;
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(events_entity_1.EN_Events)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map