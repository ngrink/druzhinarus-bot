import { Menu, MenuRange } from "@grammyjs/menu"
import { parseISO } from "date-fns"

import { formatDateRange } from "@/shared/helpers"

import { api } from "@/api"
import { Context } from "@/context"
import { signupTripHandler } from "@/handlers"

export const signupTripsMenu = new Menu<Context>("signup-trips-menu")
  .dynamic(async () => {
    const trips = await api.events.getEvents("TRIP", true)
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
          signupTripHandler
        )
       .row()
    }
    return range
  })
