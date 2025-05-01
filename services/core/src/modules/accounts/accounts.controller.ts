import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { AccountType } from '@/shared/generated/prisma/client';
import { AccountWithUserDto, CreateTelegramAccountDto } from '@/shared/dto/accounts';

import { AccountsService } from './accounts.service';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  /**
  * Create a new telegram account
  */
  @Post('telegram')
  @ApiBody({type: CreateTelegramAccountDto, required: true})
  @ApiCreatedResponse({type: AccountWithUserDto, description: 'Account data'})
  createTelegramAccount(@Body() data: CreateTelegramAccountDto): Promise<AccountWithUserDto> {
    return this.accountsService.createTelegramAccount(data);
  }

  /**
  * Get all accounts
  */
  @Get()
  @ApiOkResponse({type: [AccountWithUserDto], description: 'List of accounts'})
  getAllAccounts(): Promise<AccountWithUserDto[]> {
    return this.accountsService.getAllAccounts()
  }


  /**
  * Get account
  */
  @Get("/:type/:channelId")
  @ApiParam({ name: "type", enum: AccountType })
  @ApiParam({ name: "channelId", type: "number" })
  @ApiOkResponse({type: AccountWithUserDto, description: 'Account data'})
  getAccount(
    @Param("type") type: AccountType,
    @Param("channelId") channelId: number,
  ): Promise<AccountWithUserDto> {
    return this.accountsService.getAccount({type, channelId});
  }
}
