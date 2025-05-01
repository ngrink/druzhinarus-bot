import { ApiProperty } from '@nestjs/swagger';

export class EventMemberDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  eventId: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  userId: number;
}
