import { ApiProperty } from '@nestjs/swagger';

export class QuoteDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  text: string;
  author: string | null;
}
