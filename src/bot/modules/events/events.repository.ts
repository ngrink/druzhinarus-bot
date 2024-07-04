import { Event, EventMember, PrismaClient, User } from '@prisma/client'
import { CreateEventDto, UpdateEventDto } from './dto'
import { startOfToday } from 'date-fns'

export type UserFlavor = {
  user: User
}

export class EventsRepository {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createEvent(data: CreateEventDto): Promise<Event> {
    const event = await this.prisma.event.create({
      data: {
        title: data.title,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        link: data.link,
        isPublic: data.isPublic,
      }
    })

    return event
  }
  
  async getEvents(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      orderBy: [
        {
          startDate: 'asc'
        },
        {
          endDate: 'asc'
        }
      ]
    })

    return events
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      where: {
        endDate: {
          gte: startOfToday()
        }
      },
      orderBy: [
        {
          startDate: 'asc'
        },
        {
          endDate: 'asc'
        }
      ]
    })

    return events
  }

  async getCommonEvents(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      where: {
        type: "COMMON"
      },
      orderBy: [
        {
          startDate: 'asc'
        },
        {
          endDate: 'asc'
        }
      ]
    })

    return events
  }

  async getTripEvents(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      where: {
        type: "TRIP"
      },
      orderBy: [
        {
          startDate: 'asc'
        },
        {
          endDate: 'asc'
        }
      ]
    })

    return events
  }

  async getEvent(id: number): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        id: id
      }
    })

    return event
  }

  async updateEvent(id: number, data: UpdateEventDto): Promise<Event | null> {
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

  async signupToEvent(eventId: number, userId: number) {
    await this.prisma.eventMember.create({
      data: {
        userId: userId,
        eventId: eventId
      }
    })
  }

  async getAllEventsMembers(): Promise<(EventMember & UserFlavor)[]>  {
    const members = await this.prisma.eventMember.findMany({
      include: {
        user: true
      }
    })

    return members
  }

  async getEventMembers(eventId: number): Promise<(EventMember & UserFlavor)[]> {
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
}