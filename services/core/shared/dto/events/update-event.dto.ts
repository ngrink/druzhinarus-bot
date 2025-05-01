import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator";

import { EventType } from "@/shared/generated/prisma/client";

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  link?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
