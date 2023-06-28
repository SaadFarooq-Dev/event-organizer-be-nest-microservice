import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddEventAttendeeDto } from 'src/events/dtos/AddEventAttendee.dto';
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

  @MessagePattern('event.add.attendee')
  @UsePipes(ValidationPipe)
  async addEventAttendee(
    @Payload(ValidationPipe)
    data: AddEventAttendeeDto,
  ) {
    const event = await this.eventService.addEventAttendee(data);
    const response = { success: true, event: event };
    return response;
  }

  @MessagePattern('event.attendee.joined')
  @UsePipes(ValidationPipe)
  async getJoinedEvents(
    @Payload(ValidationPipe)
    id: string,
  ) {
    const events = await this.eventService.getJoinedEvents(id);
    const response = { success: true, event: events };
    return response;
  }

  @MessagePattern('event.user.get')
  @UsePipes(ValidationPipe)
  async getUserEvents(
    @Payload(ValidationPipe)
    user_id: string,
  ) {
    const events = await this.eventService.getUserEvents(user_id);
    const response = { success: true, event: events };
    return response;
  }
}
