import { IsOptional, IsString } from "class-validator";

export class CreatePhotoDto {
  @IsString()
  fileId: string;

  @IsString()
  @IsOptional()
  groupId?: string;
}
