export class CreateUserDto {
  id!: number
  username?: string;
  fullname?: string;
  fullname_telegram?: string;
  phone?: string;
  birthday?: Date;
}
