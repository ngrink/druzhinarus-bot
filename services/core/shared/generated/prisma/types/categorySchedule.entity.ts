import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';

export class CategorySchedule {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  weekday: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  hour: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  categoryId: number | null;
  category?: Category | null;
}
