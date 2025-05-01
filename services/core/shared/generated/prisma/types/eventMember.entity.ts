import { ApiProperty } from '@nestjs/swagger';
import { Event } from './event.entity';
import { User } from './user.entity';

export class EventMember {
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
  event?: Event;
  user?: User;
}
