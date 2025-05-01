import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { EventType } from '@/shared/generated/prisma/client';
import { CreateEventDto, SignupToEventDto, UpdateEventDto } from '@/shared/dto/events';

import { EventsService } from './events.service';
import { EventWithMembers } from './events.repository';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
  * Create a new event
  */
  @Post()
  createEvent(@Body() data: CreateEventDto) {
    return this.eventsService.createEvent(data);
  }

  /**
  * Get events
  */
  @Get()
  @ApiQuery({name: 'type', required: false, enum: EventType })
  @ApiQuery({name: 'upcoming', required: false})
  getEvents(
    @Query('type') type?: EventType,
    @Query('upcoming') upcoming?: boolean,
  ) {
    return this.eventsService.getEvents({
      type,
      upcoming,
    });
  }

  /**
  * Get events with members
  */
  @Get('members')
  @ApiQuery({name: 'type', required: false, enum: EventType })
  @ApiQuery({name: 'upcoming', required: false})
  @ApiOkResponse({type: [EventWithMembers]})
  getEventsWithMembers(
    @Query('type') type?: EventType,
    @Query('upcoming') upcoming?: boolean,
  ) {
    return this.eventsService.getEventsWithMembers({
      type,
      upcoming,
    });
  }

  /**
  * Get an event
  */
  @Get(':id')
  getEvent(@Param('id') id: number) {
    return this.eventsService.getEvent(id)
  }

  /**
  * Update an event
  */
  @Patch(':id')
  updateEvent(@Param('id') id: number, @Body() data: UpdateEventDto) {
    return this.eventsService.updateEvent(id, data)
  }

  /**
  * Delete an event
  */
  @Delete(':id')
  deleteEvent(@Param('id') id: number) {
    return this.eventsService.deleteEvent(id)
  }

  /**
  * Signup to an event
  */
  @Post(':id/signup')
  signupToEvent(@Param('id') id: number, @Body() data: SignupToEventDto) {
    return this.eventsService.signupToEvent(id, data.userId)
  }

  /**
  * Get event members
  */
  @Get(':id/members')
  getEventMembers(
    @Param('id') id: number,
  ) {
    return this.eventsService.getEventMembers(id)
  }

  /**
  * Get an event member
  */
  @Get(':id/members/:memberId')
  getEventMember(@Param('id') id: number, @Param('memberId') memberId: number) {
    return this.eventsService.getEventMember(id, memberId)
  }
}
