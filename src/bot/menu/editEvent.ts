import { Menu, MenuRange } from "@grammyjs/menu"

import { eventsService } from "@/modules/events"

import { Context } from "@/bot/context"
import { formatDateRange } from "@/helpers"

export const editEventMenu = new Menu<Context>("edit-event-menu")
  .dynamic(async () => {
    const events = await eventsService.getCommonEvents()
    const range = new MenuRange<Context>()
    
    for (const event of events) {
      const { title, startDate, endDate } = event
      range
        .text(
          {
            text: `[${formatDateRange(startDate, endDate)}] ${title}`,
            payload: String(event.id)
          }, 
          async (ctx) => {
            await ctx.conversation.enter("editEvent")           
          }
        )
       .row()
    }
    return range
  })