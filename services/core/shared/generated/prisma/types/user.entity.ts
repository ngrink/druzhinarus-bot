import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { EventMember } from './eventMember.entity';
import { Account } from './account.entity';

export class User {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  fullname: string;
  phone: string | null;
  email: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  birthday: Date | null;
  vk: string | null;
  @ApiProperty({
    enum: Role,
  })
  role: Role;
  events?: EventMember[];
  accounts?: Account[];
}
