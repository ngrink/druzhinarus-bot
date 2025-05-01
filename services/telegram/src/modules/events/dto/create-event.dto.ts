import { EventType } from "@prisma/client";

export class CreateEventDto {
  title!: string;
  type!: EventType;
  startDate!: Date;

  endDate?: Date;
  link?: string;
  isPublic?: boolean;
  price?: number;
  discountedPrice?: number;
  discountEndDate?: Date;
}
