import { AccountType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  userId: number;
  @ApiProperty({
    enum: AccountType,
  })
  type: AccountType;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  channelId: number;
  username: string | null;
}
