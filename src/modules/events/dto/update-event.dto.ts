import { EventType } from "@prisma/client";

export class UpdateEventDto {
  title?: string;
  type?: EventType;
  startDate?: Date;
  endDate?: Date;
  link?: string
  isPublic?: boolean
}