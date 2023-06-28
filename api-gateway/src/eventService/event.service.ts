import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AddEventAttendeeDto } from 'src/dtos/add-event-attendee.dto';
import { CreateEventDto } from 'src/dtos/create-event-request.dto';
import { CreateEvent } from 'src/Events/event/create-event.event';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventClient: ClientKafka,
  ) {}

  async createEvent(
    user_id: string,
    { title, description, location, startDate, endDate }: CreateEventDto,
  ) {
    const res = await this.eventClient.send(
      'event.create',
      new CreateEvent(
        title,
        description,
        location,
        startDate,
        endDate,
        user_id,
      ),
    );
    return res;
  }

  async updateEvent(user_id: string, event_id: string, updateData: object) {
    const res = await this.eventClient.send('event.update', {
      user_id,
      event_id,
      updateData,
    });
    return res;
  }

  async addEventAttendee({ user_id, event_id }: AddEventAttendeeDto) {
    const res = await this.eventClient.send('event.add.attendee', {
      user_id,
      event_id,
    });
    return res;
  }

  async getJoinedEvents(user_id: string) {
    const res = await this.eventClient.send('event.attendee.joined', user_id);
    return res;
  }

  async getUserEvents(user_id: string) {
    const res = await this.eventClient.send('event.user.get', user_id);
    return res;
  }

  async getEvents() {
    const res = await this.eventClient.send('event.all', {});
    return res;
  }

  async getEvent(id: string) {
    const res = await this.eventClient.send('event.get', id);
    return res;
  }
}
