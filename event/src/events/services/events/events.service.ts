import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from 'src/events/dtos/CreateEvent.dto';
import { Event } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    const event = await this.eventRepository.save(newEvent);
    return event;
  }

  getEvents() {
    return this.eventRepository.find();
  }

  findEventById(id: string) {
    return this.eventRepository.findOneBy({ id: id });
  }
  async updateEvent(data: {
    user_id: string;
    event_id: { id: string };
    updateData: object;
  }) {
    const event = await this.eventRepository.findOneBy({
      id: data.event_id.id,
      user_id: data.user_id,
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    Object.assign(event, data.updateData);
    return this.eventRepository.save(event);
  }
}
