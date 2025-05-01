import { Injectable } from '@nestjs/common';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { startOfToday } from 'date-fns';

import { EventDto } from '@/shared/generated/prisma/types/event.dto';
import { EventMemberDto } from '@/shared/generated/prisma/types/eventMember.dto';
import { CreateEventDto, UpdateEventDto } from '@/shared/dto/events';
import { UserFlavorDto } from '@/shared/dto/users';
import { PrismaService } from '@/config/';

import { getEventsOptions } from './events.service';


export class EventMemberWithUser extends IntersectionType(EventMemberDto, UserFlavorDto) {}

export class MembersFlavor {
  @ApiProperty({
    type: EventMemberWithUser,
    isArray: true,
  })
  members: EventMemberWithUser[]
}

export class EventWithMembers extends IntersectionType(EventDto, MembersFlavor) {}



@Injectable()
export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(data: CreateEventDto): Promise<EventDto> {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        ...(!data.endDate && {endDate: data.startDate})
      }
    })

    return event
  }

  async getEvents(options?: getEventsOptions): Promise<EventDto[]> {
    let events = await this.prisma.event.findMany({
      where: {
        ...(options.type && {type: options.type}),
        ...(options.upcoming && {endDate: {gte: startOfToday()}})
      },
      orderBy: [
        { startDate: 'asc' },
        { endDate: 'asc' }
      ],
    })

    return events
  }

  async getEventsWithMembers(options?: getEventsOptions) {
    let events = await this.prisma.event.findMany({
      where: {
        ...(options.type && {type: options.type}),
        ...(options.upcoming && {endDate: {gte: startOfToday()}})
      },
      include: {
        members: {
          include: {
            user: true
          }
        }
      },
      orderBy: [
        { startDate: 'asc' },
        { endDate: 'asc' }
      ],
    })

    return events
  }

  async getEvent(id: number): Promise<EventDto | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        id: id
      }
    })

    return event
  }

  async updateEvent(id: number, data: UpdateEventDto): Promise<EventDto | null> {
    const event = await this.prisma.event.update({
      data: data,
      where: {
        id: id
      }
    })

    return event
  }

  async deleteEvent(id: number): Promise<void> {
    await this.prisma.event.delete({
      where: {
        id: id
      }
    })
  }

  async signupToEvent(eventId: number, userId: number): Promise<void> {
    await this.prisma.eventMember.create({
      data: {
        userId: userId,
        eventId: eventId
      }
    })
  }

  async getAllEventsMembers(): Promise<EventMemberWithUser[]>  {
    const members = await this.prisma.eventMember.findMany({
      include: {
        user: true
      }
    })

    return members
  }

  async getEventMembers(eventId: number): Promise<EventMemberWithUser[]> {
    const members = await this.prisma.eventMember.findMany({
      where: {
        eventId: eventId
      },
      include: {
        user: true
      }
    })

    return members
  }

  async getEventMember(eventId: number, userId: number): Promise<EventMemberDto | null> {
    const member = await this.prisma.eventMember.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    })

    return member
  }
}
