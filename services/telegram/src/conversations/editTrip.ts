import { Conversation } from "@grammyjs/conversations";
import { parseISO } from "date-fns";

import { formatEvent, formatMessage } from "@/shared/helpers";

import { api } from "@/api";
import { Context } from "@/context";
import { convutils } from "./convutils";

export async function editTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)
  const event = await api.events.getEvent(eventId)
    .then(res => res.data)

  if (!event) {
    await ctx.reply('Поход не найден')
    return
  }

  await ctx.reply(formatMessage`
    [Изменение похода]
    ${formatEvent({
      ...event,
      startDate: parseISO(event.startDate),
      endDate: event.endDate? parseISO(event.endDate) : null,
      discountEndDate: event.discountEndDate? parseISO(event.discountEndDate) : null,
    })}
  `, {
    parse_mode: "HTML",
    // @ts-ignore
    disable_web_page_preview: true,
  })

  await ctx.reply('1/4: Введите новое название мероприятия (опционально)')
  const eventTitle = await convutils.textOptional(conversation,ctx)

  await ctx.reply('2/4: Введите новую дату начала мероприятия (опционально)')
  const eventStartDate = await convutils.upcomingDateOptional(conversation,ctx)

  await ctx.reply('3/4: Введите новую дату конца мероприятия')
  const eventEndDate = await convutils.upcomingDateOptional(conversation,ctx)

  await ctx.reply('4/4: Добавьте новую ссылку на подробности')
  let eventLink = await convutils.urlOptional(conversation,ctx)

  await conversation.external(async () => {
    await api.events.updateEvent(eventId, {
      title: eventTitle,
      startDate: eventStartDate?.toISOString(),
      endDate: eventEndDate?.toISOString(),
      link: eventLink,
    })
  })

  await ctx.reply('Поход изменен')
}
