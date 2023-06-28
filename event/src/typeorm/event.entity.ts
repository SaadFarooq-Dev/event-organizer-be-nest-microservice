import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
  })
  location: string;

  @Column({
    name: 'start_date',
    nullable: false,
    type: 'timestamp',
    default: () => 'NOW()',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    nullable: false,
    type: 'timestamp',
  })
  endDate: Date;

  @Column('uuid', {
    nullable: false,
  })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
