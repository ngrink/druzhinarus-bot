import { NotFoundException } from "@nestjs/common";

export class UsersException {
	static UserNotFound(id: number): NotFoundException {
		return new NotFoundException(`User with id ${id} not found`, 'USER_NOT_FOUND')
	}
}
