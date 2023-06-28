import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
@Index('idx_user_event', ['user_id', 'event'], { unique: true })
export class Attendee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    nullable: false,
  })
  user_id: string;

  @ManyToOne(() => Event, (event) => event.attendees)
  event: Event;
}
