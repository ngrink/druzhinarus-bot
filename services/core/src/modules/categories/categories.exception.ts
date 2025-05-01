import { BadRequestException, NotFoundException } from "@nestjs/common";

export class CategoriesException {
	static CategoryNotFound(id: number): NotFoundException {
		return new NotFoundException(`Category with id ${id} not found`, 'CATEGORY_NOT_FOUND')
	}
}
