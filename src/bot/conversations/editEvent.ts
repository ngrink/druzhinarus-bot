import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { formatEvent, formatMessage } from "@/helpers";
import { eventsService } from "@/modules/events";
import { convutils } from "./convutils";

export async function editEvent(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)
  const event = await eventsService.getEvent(eventId)

  if (!event) {
    await ctx.reply('Мероприятие не найдено')
    return
  }

  await ctx.reply(formatMessage`
    [Изменение меропрития]
    ${formatEvent(event)}
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
    await eventsService.updateEvent(eventId, {
      title: eventTitle,
      startDate: eventStartDate,
      endDate: eventEndDate,
      link: eventLink,
    })
  })

  await ctx.reply("Мероприятие изменено")
}
