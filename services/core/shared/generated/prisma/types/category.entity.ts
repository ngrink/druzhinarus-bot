import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.entity';
import { CategorySchedule } from './categorySchedule.entity';

export class Category {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  title: string;
  description: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  posts?: Post[];
  CategorySchedule?: CategorySchedule[];
}
