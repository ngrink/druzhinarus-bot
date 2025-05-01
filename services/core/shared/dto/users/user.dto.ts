import { ApiProperty } from "@nestjs/swagger";

import { UserDto } from "@/shared/generated/prisma/types/user.dto";

export class UserFlavorDto {
  @ApiProperty()
  user: UserDto
}
