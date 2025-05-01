import { ApiProperty } from '@nestjs/swagger';

export class CategoryScheduleDto {
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
}
