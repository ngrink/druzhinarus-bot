import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  birthday?: Date;

  @IsString()
  @IsOptional()
  vk?: string
}
