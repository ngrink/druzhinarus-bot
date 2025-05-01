import { EventsRepository } from "./events.repository";
import { EventsService } from "./events.service";

const eventsRepository = new EventsRepository()
const eventsService = new EventsService(eventsRepository)

export { 
  eventsService 
}