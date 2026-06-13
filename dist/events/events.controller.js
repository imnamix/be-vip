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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_dto_1 = require("./entity/events.dto");
const events_service_1 = require("./events.service");
const events_dto_2 = require("./entity/events.dto");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async create(payload) {
        try {
            const newData = await this.eventsService.create(payload);
            return {
                success: true,
                message: "Event Added Successfully.",
                data: newData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while adding new event",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllData(page = 1, limit = 1000, search, status) {
        try {
            const allData = await this.eventsService.getEventsData({
                page,
                limit,
                search,
                status,
            });
            return {
                success: true,
                message: "Events Fetched Successfully.",
                data: allData.data,
                count: allData.count,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Events Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const eventData = await this.eventsService.getEventById(id);
            return eventData;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error While Fetching Event Data",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateEvents(id, payload) {
        try {
            const updatedData = await this.eventsService.updateEventsData(id, payload);
            return updatedData;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while updating event",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteEvent(payload) {
        try {
            const deletedData = await this.eventsService.deleteEvents(payload.ids);
            return deletedData;
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: "Error while deleting event",
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({ type: events_dto_1.EventsDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [events_dto_1.EventsDTO]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, type: String }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __param(3, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)("updateEvents/:id"),
    (0, swagger_1.ApiBody)({ type: events_dto_1.EventsDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, events_dto_1.EventsDTO]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEvents", null);
__decorate([
    (0, common_1.Delete)("deleteEvents"),
    (0, swagger_1.ApiBody)({ type: events_dto_2.DeleteEventDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [events_dto_2.DeleteEventDTO]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvent", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)("Events"),
    (0, common_1.Controller)("events"),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map