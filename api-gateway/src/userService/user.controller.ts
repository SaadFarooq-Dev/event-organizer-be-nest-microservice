import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../config/passport/JwtStrategy/jwt-auth-guard';
import { CreateUserDto } from '../dtos/create-user-request.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { registerResponsePatterns } from '../helpers/registerResponsePatterns';
import { USERRESPONSEPATTERNS } from '../utils/constants';

@Controller()
export class UserController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly userService: UserService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  onModuleInit() {
    registerResponsePatterns(USERRESPONSEPATTERNS, this.userClient);
  }
  onModuleDestroy() {
    this.userClient.close();
  }

  @Get('user/all')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getUsers() {
    const data = this.userService.getUsers();
    return data;
  }
  @Get('user/id/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getUser(@Param(ValidationPipe) id: { id: number }) {
    const data = this.userService.getUser(id.id);
    return data;
  }

  @Patch('user/update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Request() req) {
    const user_id = req.user.id;
    const updateData = req.body;
    const data = this.userService.updateUser(user_id, updateData);
    return data;
  }

  @Post('user/create')
  @UsePipes(ValidationPipe)
  createUsers(@Body() createUserDto: CreateUserDto) {
    const data = this.userService.createUser(createUserDto);
    return data;
  }
  @Post('auth/login')
  @UsePipes(ValidationPipe)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    const data = this.userService.loginUser(loginUserDto);
    return data;
  }
}
