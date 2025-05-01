import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateScheduleDto {
  @IsNumber()
  weekday: number;

  @IsNumber()
  hour: number;

  @IsNumber()
  @IsOptional()
  categoryId: number | null;
}
