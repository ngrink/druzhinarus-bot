export class CreateUserDto {
  id!: number
  username?: string;
  fullname?: string;
  phone?: string;
  birthday?: Date;
}