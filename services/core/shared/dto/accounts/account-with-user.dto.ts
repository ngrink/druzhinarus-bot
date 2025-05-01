import { ApiProperty } from '@nestjs/swagger';

import { AccountType } from '@/shared/generated/prisma/client';
import { UserDto } from '@/shared/generated/prisma/types/user.dto';

export class AccountWithUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: AccountType })
  type: AccountType;

  @ApiProperty()
  channelId: number;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  user: UserDto;
}
