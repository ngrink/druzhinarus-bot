import { Menu, MenuRange } from "@grammyjs/menu"
import { parseISO } from "date-fns"

import { formatDateRange } from "@/shared/helpers"

import { api } from "@/api"
import { Context } from "@/context"

export const deleteTripMenu = new Menu<Context>("delete-trip-menu")
  .dynamic(async () => {
    const trips = await api.events.getEvents("TRIP")
      .then(res => res.data)

    const range = new MenuRange<Context>()

    for (const trip of trips) {
      const startDate = parseISO(trip.startDate)
      const endDate = trip.endDate? parseISO(trip.endDate) : null

      range
        .text(
          {
            text: `[${formatDateRange(startDate, endDate)}] ${trip.title}`,
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
