import { Injectable } from '@nestjs/common';

import { AccountWithUserDto, CreateTelegramAccountDto, GetAccountDto } from '@/shared/dto/accounts';
import { UsersService } from '@/modules/users';

import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly usersService: UsersService
  ) {}

  async createTelegramAccount(data: CreateTelegramAccountDto): Promise<AccountWithUserDto> {
    const user = await this.usersService.createUser(data.user)
    const account = await this.accountsRepository.createTelegramAccount(user.id, data)

    return account
  }

  async getAllAccounts(): Promise<AccountWithUserDto[]> {
    const accounts = await this.accountsRepository.getAllAccounts()

    return accounts
  }

  async getAccount(data: GetAccountDto): Promise<AccountWithUserDto> {
    const account = await this.accountsRepository.getAccount(data)

    return account
  }
}
