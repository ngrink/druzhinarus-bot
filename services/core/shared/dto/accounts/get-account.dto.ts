import { IsEnum, IsNumber } from "class-validator";

import { AccountType } from "@/shared/generated/prisma/client";

export class GetAccountDto {
  @IsEnum(AccountType)
  type: AccountType

  @IsNumber()
  channelId: number
}
