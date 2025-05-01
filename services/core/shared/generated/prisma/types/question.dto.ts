import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  question: string;
  answer: string;
}
