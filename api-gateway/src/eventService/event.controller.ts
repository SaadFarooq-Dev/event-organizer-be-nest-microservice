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
import { RoleGuard } from 'src/config/auth/role/role.guard';
import { Roles } from 'src/config/auth/roles/roles.decorator';
import { Role } from 'src/utils/role.enum';

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
  @Roles(Role.Organizer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(ValidationPipe)
  createEvent(@Request() req, @Body() createEventDto: CreateEventDto) {
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
  @UseGuards(JwtAuthGuard)
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

  @Post('event/:id/attendee')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  addEventAttendee(@Request() req, @Param(ValidationPipe) id: { id: string }) {
    const payload = {
      user_id: req?.user?.id,
      event_id: id.id,
    };
    const data = this.eventService.addEventAttendee(payload);
    return data;
  }

  @Get('event/attendee')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getJoinedEvents(@Request() req) {
    const user_id = req?.user?.id;
    const data = this.eventService.getJoinedEvents(user_id);
    return data;
  }

  @Get('event/user')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getUserEvents(@Request() req) {
    const user_id = req?.user?.id;
    const data = this.eventService.getUserEvents(user_id);
    return data;
  }
}
