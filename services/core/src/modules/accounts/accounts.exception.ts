import { NotFoundException } from "@nestjs/common";

export class AccountsException {
	static AccountNotFound(id: number): NotFoundException {
		return new NotFoundException(`Account with id ${id} not found`, 'ACCOUNT_NOT_FOUND')
	}
}
