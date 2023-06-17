import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '../dtos/create-user-request.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserEvent } from '../Events/user/create-user.event';
import { LoginUserEvent } from '../Events/user/login-user.event';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async createUser({
    name,
    email,
    password,
    phoneNumber,
    role,
  }: CreateUserDto) {
    const res = await this.userClient.send(
      'user.create',
      new CreateUserEvent(name, email, password, phoneNumber, role),
    );

    return res;
  }

  async loginUser({ email, password }: LoginUserDto) {
    const res = await this.userClient.send(
      'user.login',
      new LoginUserEvent(email, password),
    );

    return res;
  }

  async updateUser(user_id: string, updateData: object) {
    const res = await this.userClient.send('user.update', {
      user_id,
      updateData,
    });
    return res;
  }

  async getUsers() {
    const res = await this.userClient.send('user.all', {});
    return res;
  }

  async getUser(id: number) {
    const res = await this.userClient.send('user.get', id);
    return res;
  }
}
