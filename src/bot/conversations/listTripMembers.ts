import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";
import { ru } from "date-fns/locale";

import { Context } from "@/bot/context";
import { formatEvents, formatMembers, formatMessage } from "@/helpers";
import { usersService } from "@/modules/users";
import { eventsService } from "@/modules/events";

export async function listTripMembers(conversation: Conversation<Context>, ctx: Context) {
  const trips = await eventsService.getTripEvents()
  const members = await eventsService.getAllEventsMembers()
  const tripsFormatted = formatEvents(trips, { enumerate: true, members })

  if (!members.length) {
    await ctx.reply('Нет участников')
    return
  }

  await ctx.reply('[Список участников]')

  await ctx.reply(tripsFormatted, {
    parse_mode: 'HTML',
    // @ts-ignore
    disable_web_page_preview: true,
  })

  await ctx.reply('Выберите номер похода')
  const number = await conversation.form.int()
  const event = trips[number-1]
  const tripMembers = members.filter((member) => member.eventId == event.id).map(member => member.user)

  await ctx.reply(formatMembers(tripMembers), {
    parse_mode: 'HTML',
    // @ts-ignore
    disable_web_page_preview: true,
  })
}