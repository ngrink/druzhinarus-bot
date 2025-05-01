import { IsNumber, IsObject, IsString } from "class-validator";

import { CreateUserDto } from "../users";

export class CreateTelegramAccountDto {
  @IsNumber()
  channelId: number;

  @IsString()
  username?: string;

  @IsObject()
  user: CreateUserDto
}
