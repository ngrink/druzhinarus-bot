import { Menu, MenuRange } from "@grammyjs/menu"

import { eventsService } from "@/modules/events"

import { Context } from "@/bot/context"
import { formatDateRange } from "@/helpers"

export const deleteTripMenu = new Menu<Context>("delete-trip-menu")
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
            await ctx.conversation.enter("deleteTrip")
            ctx.menu.update()
          }
        )
       .row()
    }
    return range
  })