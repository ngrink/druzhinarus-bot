import { ApiProperty } from '@nestjs/swagger';

export class SettingsDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  photoSchedulerSpec: string;
}
