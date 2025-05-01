import { ApiProperty } from '@nestjs/swagger';

export class Photo {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  fileId: string;
  groupId: string | null;
  isUsed: boolean;
}
