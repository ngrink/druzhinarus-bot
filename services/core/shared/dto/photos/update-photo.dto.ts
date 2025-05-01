import { IsBoolean } from "class-validator";

export class UpdatePhotoDto {
  @IsBoolean()
  isUsed: boolean;
}
