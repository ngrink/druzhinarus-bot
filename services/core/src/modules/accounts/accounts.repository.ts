import { Injectable } from '@nestjs/common';

import { CreateTelegramAccountDto, GetAccountDto, AccountWithUserDto } from '@/shared/dto/accounts';

import { PrismaService } from '@/config/';


@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTelegramAccount(userId: number, data: CreateTelegramAccountDto): Promise<AccountWithUserDto> {
    const account = await this.prisma.account.create({
      data: {
        type: "TELEGRAM",
        channelId: data.channelId,
        username: data.username,
        userId: userId,
      },
      include: {
        user: true
      }
    });

    return account
  }

  async getAllAccounts(): Promise<AccountWithUserDto[]> {
    const accounts = await this.prisma.account.findMany({
      include: {
        user: true
      }
    })

    return accounts
  }

  async getAccount(data: GetAccountDto): Promise<AccountWithUserDto> {
    const account = await this.prisma.account.findFirst({
      where: {
        type: data.type,
        channelId: data.channelId
      },
      include: {
        user: true
      }
    })

    return account
  }
}
