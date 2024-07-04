import { Menu, MenuRange } from "@grammyjs/menu"

import { eventsService } from "@/modules/events"

import { Context } from "@/bot/context"
import { signupTripHandler } from "@/handlers"
import { formatDateRange } from "@/helpers"

export const signupTripsMenu = new Menu<Context>("signup-trips-menu")
  .dynamic(async () => {
    const trips = await eventsService.getUpcomingTripsEvents()
    const range = new MenuRange<Context>()
    
    for (const trip of trips) {
      const { title, startDate, endDate } = trip
      range
        .text(
          {
            text: `[${formatDateRange(startDate, endDate)}] ${title}`,
            payload: String(trip.id)
          }, 
          signupTripHandler
        )
       .row()
    }
    return range
  })