import { Menu, MenuRange } from "@grammyjs/menu"
import { parseISO } from "date-fns"

import { formatDateRange } from "@/shared/helpers"

import { api } from "@/api"
import { Context } from "@/context"

export const deleteEventMenu = new Menu<Context>("delete-event-menu")
  .dynamic(async () => {
    const events = await api.events.getEvents("COMMON")
      .then(res => res.data)

    const range = new MenuRange<Context>()

    for (const event of events) {
      const startDate = parseISO(event.startDate)
      const endDate = event.endDate? parseISO(event?.endDate) : null

      range
        .text(
          {
            text: `[${formatDateRange(startDate, endDate)}] ${event.title}`,
            payload: String(event.id)
          },
          async (ctx) => {
            await ctx.conversation.enter("deleteEvent")
            ctx.menu.update()
          }
        )
       .row()
    }
    return range
  })
