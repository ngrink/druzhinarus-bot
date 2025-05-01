import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

import { EventType } from "@/shared/generated/prisma/client";

export class CreateEventDto {
  @IsString()
  title: string;

  @IsEnum(EventType)
  @ApiProperty({ enum: EventType })
  type: EventType;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  link?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  discountedPrice?: number;

  @IsDateString()
  @IsOptional()
  discountEndDate?: Date;
}
