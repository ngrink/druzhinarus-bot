import { Menu, MenuRange } from "@grammyjs/menu"

import { eventsService } from "@/modules/events"

import { Context } from "@/bot/context"
import { formatDateRange } from "@/helpers"

export const editTripMenu = new Menu<Context>("edit-trip-menu")
  .dynamic(async () => {
    const trips = await eventsService.getTripEvents()
    const range = new MenuRange<Context>()
    
    for (const trip of trips) {
      const { title, startDate, endDate } = trip
      range
        .text(
          {
            text: `[${formatDateRange(startDate, endDate)}] ${title}`,
            payload: String(trip.id)
          }, 
          async (ctx) => {
            await ctx.conversation.enter("editTrip")           
          }
        )
       .row()
    }
    return range
  })