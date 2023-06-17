import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const BCRYPT_HASH_ROUND = 10;
export enum ROLES {
  USER = 'user',
  ORGANIZER = 'organizer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    nullable: false,
    default: '',
    select: false,
  })
  password: string;

  @Column({
    name: 'phone_number',
    nullable: false,
    default: '',
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ROLES,
    default: ROLES.USER,
  })
  role: ROLES;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND);
  }
}
