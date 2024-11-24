import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { eventsService } from "@/modules/events";
import { convutils } from "./convutils";

export async function addEvent(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('[Добавление меропрития]')

  await ctx.reply('1/4: Введите название мероприятия')
  const eventTitle = await conversation.form.text()

  await ctx.reply('2/4: Введите дату начала мероприятия')
  const eventStartDate = await convutils.upcomingDate(conversation, ctx);

  await ctx.reply('3/4: Введите дату конца мероприятия (опционально)')
  const eventEndDate = await convutils.upcomingDate(conversation, ctx);

  await ctx.reply('4/4: Добавьте ссылку на подробности (опционально)')
  const eventLink = await convutils.linkOptional(conversation, ctx)

  await conversation.external(async () => {
    await eventsService.createEvent({
      title: eventTitle,
      type: "COMMON",
      startDate: eventStartDate,
      endDate: eventEndDate,
      link: eventLink,
      isPublic: true,
    })
  })

  await ctx.reply('Мероприятие добавлено')
}
