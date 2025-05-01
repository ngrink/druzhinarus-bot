import { NotFoundException } from "@nestjs/common";

export class EventsException {
	static EventNotFound(id: number): NotFoundException {
		return new NotFoundException(`Event with id ${id} not found`, 'USER_NOT_FOUND')
	}
}
