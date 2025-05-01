import { Injectable } from '@nestjs/common';
import { EventType } from '@/shared/generated/prisma/client';

import { CreateEventDto, UpdateEventDto } from '@/shared/dto/events';
import { EventsRepository } from './events.repository';

export type getEventsOptions = {
  type: EventType,
  upcoming: boolean,
}

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async createEvent(data: CreateEventDto) {
    const event = await this.eventsRepository.createEvent(data)

    return event
  }

  async getEvents(options?: getEventsOptions) {
    const events = await this.eventsRepository.getEvents(options)

    return events
  }

  async getEventsWithMembers(options?: getEventsOptions) {
    const events = await this.eventsRepository.getEventsWithMembers(options)

    return events
  }

  async getEvent(id: number) {
    const event = await this.eventsRepository.getEvent(id)

    return event
  }

  async updateEvent(id: number, data: UpdateEventDto) {
    const event = await this.eventsRepository.updateEvent(id, data)

    return event
  }

  async deleteEvent(id: number) {
    await this.eventsRepository.deleteEvent(id)
  }

  async signupToEvent(eventId: number, userId: number) {
    await this.eventsRepository.signupToEvent(eventId, userId)
  }

  async getEventMembers(eventId: number) {
    const members = await this.eventsRepository.getEventMembers(eventId)

    return members
  }

  async getEventMember(eventId: number, userId: number) {
    const member = await this.eventsRepository.getEventMember(eventId, userId)

    return member
  }
}
