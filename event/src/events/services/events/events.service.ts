import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEventAttendeeDto } from 'src/events/dtos/AddEventAttendee.dto';
import { CreateEventDto } from 'src/events/dtos/CreateEvent.dto';
import { Event, Attendee } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    const event = await this.eventRepository.save(newEvent);
    return event;
  }

  getEvents() {
    return this.eventRepository
      .createQueryBuilder('event')
      .select('event')
      .loadRelationCountAndMap(
        'event.attendeeCount',
        'event.attendees',
        'attendee',
      )
      .getMany();
  }

  async findEventById(id: string) {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.id = :id', { id })
      .loadRelationCountAndMap(
        'event.attendeeCount',
        'event.attendees',
        'attendee',
      )
      .getOne();

    return event;
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

  async addEventAttendee(data: AddEventAttendeeDto) {
    const attendee = new Attendee();
    attendee.user_id = data.user_id;
    attendee.event = { id: data.event_id } as Event;
    return this.attendeeRepository.save(attendee);
  }

  async getJoinedEvents(id: string) {
    const events = await this.attendeeRepository.find({
      relations: ['event'],
      where: { user_id: id },
    });
    if (!events) {
      throw new NotFoundException('Event not found');
    }
    return events;
  }

  async getUserEvents(user_id: string) {
    const events = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.user_id = :user_id', { user_id })
      .loadRelationCountAndMap(
        'event.attendeeCount',
        'event.attendees',
        'attendee',
      )
      .getMany();

    if (!events) {
      throw new NotFoundException('Event not found');
    }
    return events;
  }
}
