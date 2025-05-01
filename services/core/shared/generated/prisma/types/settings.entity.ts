import { ApiProperty } from '@nestjs/swagger';

export class Settings {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  photoSchedulerSpec: string;
}
