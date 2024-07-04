import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { formatEvent } from "@/helpers";
import { eventsService } from "@/modules/events";

export const upcomingEventsHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await eventsService.getUpcomingEvents()
  const formattedEvents = events
    .map(event => formatEvent(event, {links: true}))
    .join('\n\n')

  if (formattedEvents) {
    ctx.reply(formattedEvents, {
      parse_mode: 'HTML',
      // @ts-ignore
      disable_web_page_preview: true,
    })
  } else {
    ctx.reply('На данный момент нет мероприятий')
  }
}