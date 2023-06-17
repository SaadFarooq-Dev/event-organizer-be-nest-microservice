import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEventDto } from 'src/events/dtos/CreateEvent.dto';
import { EventsService } from 'src/events/services/events/events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @MessagePattern('event.create')
  @UsePipes(ValidationPipe)
  async createEvent(@Payload(ValidationPipe) data: CreateEventDto) {
    const event = await this.eventService.createEvent(data);
    const response = { success: true, event: event };
    return response;
  }

  @MessagePattern('event.all')
  @UsePipes(ValidationPipe)
  async getEvents() {
    const events = await this.eventService.getEvents();
    const response = { success: true, events: events };
    return response;
  }

  @MessagePattern('event.get')
  @UsePipes(ValidationPipe)
  async findEventById(@Payload(ValidationPipe) id: string) {
    const event = await this.eventService.findEventById(id);
    const response = { success: true, event: event };
    return response;
  }

  @MessagePattern('event.update')
  @UsePipes(ValidationPipe)
  async updateEvent(
    @Payload(ValidationPipe)
    data: {
      user_id: string;
      event_id: { id: string };
      updateData: object;
    },
  ) {
    const event = await this.eventService.updateEvent(data);
    const response = { success: true, event: event };
    return response;
  }
}
