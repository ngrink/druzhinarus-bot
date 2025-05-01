import { EventType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    enum: EventType,
  })
  type: EventType;
  title: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  endDate: Date | null;
  link: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  price: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  discountedPrice: number | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  discountEndDate: Date | null;
  isPublic: boolean;
}
