import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attendee } from './attende.entity';

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
    name: 'start_date',
    nullable: false,
    type: 'timestamp',
    default: () => 'NOW()',
  })
  startDate: Date;

  @Column({
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
