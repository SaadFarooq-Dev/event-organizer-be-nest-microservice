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
import { EventService } from './event.service';
import { JwtAuthGuard } from '../config/passport/JwtStrategy/jwt-auth-guard';
import { registerResponsePatterns } from '../helpers/registerResponsePatterns';
import { EVENTRESPONSEPATTERNS } from '../utils/constants';
import { CreateEventDto } from 'src/dtos/create-event-request.dto';

@Controller()
export class EventController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly eventService: EventService,
    @Inject('EVENT_SERVICE') private readonly eventClient: ClientKafka,
  ) {}
  onModuleInit() {
    registerResponsePatterns(EVENTRESPONSEPATTERNS, this.eventClient);
  }
  onModuleDestroy() {
    this.eventClient.close();
  }

  @Post('event/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createEvent(@Request() req, @Body() createEventDto: CreateEventDto) {
    console.log(req.user.id);
    const data = this.eventService.createEvent(req.user.id, createEventDto);
    return data;
  }

  @Get('event/all')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getUsers() {
    const data = this.eventService.getEvents();
    return data;
  }
  @Get('event/id/:id')
  @UsePipes(ValidationPipe)
  getUser(@Param(ValidationPipe) id: { id: string }) {
    const data = this.eventService.getEvent(id.id);
    return data;
  }

  @Patch('event/update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Request() req, @Param(ValidationPipe) id: string) {
    const user_id = req?.user?.id;
    const event_id = id;
    const updateData = req.body;
    const data = this.eventService.updateEvent(user_id, event_id, updateData);
    return data;
  }
}
