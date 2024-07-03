import { Event } from "@prisma/client"
import { CreateEventDto, UpdateEventDto } from "./dto"

type IEventsRepository = {
  createEvent: (data: CreateEventDto) => Promise<Event>
  getEvents: () => Promise<Event[]>
  getEvent: (id: number) => Promise<Event | null>
  updateEvent: (id: number, data: UpdateEventDto) => Promise<Event | null>
  deleteEvent: (id: number) => Promise<void>
}

export class EventsService {
  eventsRepository: IEventsRepository

  constructor(eventsRepository: IEventsRepository) {
    this.eventsRepository = eventsRepository
  }

  async createEvent(data: CreateEventDto) {
    const event = await this.eventsRepository.createEvent(data)

    return event
  }
  
  async getEvents() {
    const events = await this.eventsRepository.getEvents()

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
}