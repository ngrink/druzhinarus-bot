import { Conversation } from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";

import { Context } from "@/bot/context";
import { formatEvent, formatMessage } from "@/helpers";
import { eventsService } from "@/modules/events";

export async function deleteEvent(conversation: Conversation<Context>, ctx: Context) {
  await conversation.run(hydrate());
  
  const events = await eventsService.getCommonEvents();

  if (!events.length) {
    await ctx.reply(formatMessage`Нет доступных мероприятий`)
    return
  }

  const formattedEvents = events
    .map((event, i) => `[${i + 1}]\n${formatEvent(event)}`)
    .join("\n\n")

  await ctx.reply('[Удаление меропрития]\n\n' + formattedEvents, {
    parse_mode: "HTML",
    // @ts-ignore
    disable_web_page_preview: true,
  })

  await ctx.reply('1/1: Укажите через запятую номера мероприятий для удаления')
  const eventNumbers = await conversation.form.text()
  const indexes = eventNumbers.split(",").map(x => x.trim()).map(Number)
  const ids = indexes.map(i => events[i-1].id)

  await conversation.external(async () => {
    await Promise.all(ids.map(id => eventsService.deleteEvent(id)))
  })

  await ctx.reply(formatMessage`Мероприятия удалены`)
}