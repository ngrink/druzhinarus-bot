import { Event, EventMember } from "@prisma/client"

import { CreateEventDto, UpdateEventDto } from "./dto"
import { UserFlavor } from "./events.repository"

type IEventsRepository = {
  createEvent: (data: CreateEventDto) => Promise<Event>
  getEvents: () => Promise<Event[]>
  getUpcomingEvents: () => Promise<Event[]>
  getCommonEvents: () => Promise<Event[]>
  getTripEvents: () => Promise<Event[]>
  getEvent: (id: number) => Promise<Event | null>
  updateEvent: (id: number, data: UpdateEventDto) => Promise<Event | null>
  deleteEvent: (id: number) => Promise<void>
  signupToEvent(eventId: number, userId: number): Promise<void>
  getAllEventsMembers(): Promise<(EventMember & UserFlavor)[]> 
  getEventMembers(eventId: number): Promise<(EventMember & UserFlavor)[]> 
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

  async getUpcomingEvents() {
    const events = await this.eventsRepository.getUpcomingEvents()

    return events
  }

  async getCommonEvents() {
    const events = await this.eventsRepository.getCommonEvents()

    return events
  }

  async getTripEvents() {
    const events = await this.eventsRepository.getTripEvents()

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

  async getAllEventsMembers() {
    const members = await this.eventsRepository.getAllEventsMembers()

    return members
  }

  async getEventMembers(eventId: number) {
    const members = await this.eventsRepository.getEventMembers(eventId)

    return members
  }
}