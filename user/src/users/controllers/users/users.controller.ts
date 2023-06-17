import {
  Controller,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LocalAuthGuard } from 'src/config/passport/LocalStrategy/local-auth.guard';
import { RpcContextSwitchGuard } from 'src/helpers/rpcContextSwitch.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern('user.create')
  @UsePipes(ValidationPipe)
  async createUsers(@Payload(ValidationPipe) data: CreateUserDto) {
    const user = await this.userService.createUser(data);
    const response = { success: true, user: user };
    return response;
  }

  @MessagePattern('user.all')
  @UsePipes(ValidationPipe)
  async getUsers() {
    const users = await this.userService.getUsers();
    const response = { success: true, users: users };
    return response;
  }

  @MessagePattern('user.get')
  @UsePipes(ValidationPipe)
  async findUsersById(@Payload(ValidationPipe) id: string) {
    const user = await this.userService.findUsersById(id);
    const response = { success: true, user: user };
    return response;
  }

  @MessagePattern('user.update')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Payload(ValidationPipe) data: { id: string; updateData: object },
  ) {
    const user = await this.userService.updateUser(data);
    const response = { success: true, user: user };
    return response;
  }

  @MessagePattern('user.login')
  @UsePipes(ValidationPipe)
  @UseGuards(RpcContextSwitchGuard, LocalAuthGuard)
  async login(@Payload(ValidationPipe) req: any) {
    const token = await this.userService.login(req.user);
    const response = { success: true, access_token: token };
    return response;
  }
}
