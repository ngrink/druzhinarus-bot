import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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
}
