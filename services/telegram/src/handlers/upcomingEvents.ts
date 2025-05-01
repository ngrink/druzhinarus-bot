import { Middleware } from "grammy";
import { parseISO } from "date-fns";

import { formatEvent } from "@/shared/helpers";

import { api } from "@/api";
import { Context } from "@/context";

export const upcomingEventsHandler: Middleware<Context> = async (ctx: Context) => {
  let events = await api.events.getEventsWithMembers(undefined, true)
    .then(res => {
      return res.data
    })

  const formattedEvents = events
    .map(event => formatEvent({
      id: event.id,
      type: event.type,
      startDate: parseISO(event.startDate),
      endDate: event.endDate ? parseISO(event?.endDate) : null,
      price: event.price,
      discountedPrice: event.discountedPrice,
      discountEndDate: event.discountEndDate ? parseISO(event.discountEndDate) : null,
      title: event.title,
      link: event.link,
      isPublic: event.isPublic,
    }, {
      links: true,
      prices: true,
      members: event.members
    }))
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
