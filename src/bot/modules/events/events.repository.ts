import { Event, PrismaClient } from '@prisma/client'
import { CreateEventDto, UpdateEventDto } from './dto'

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
}