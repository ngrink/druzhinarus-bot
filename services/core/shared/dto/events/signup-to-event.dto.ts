import { IsNumber } from "class-validator";

export class SignupToEventDto {
  @IsNumber()
  userId: number;
}
