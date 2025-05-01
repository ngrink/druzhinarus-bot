import { Conversation } from "@grammyjs/conversations";

import { EventType } from "@/shared/generated/prisma/client";

import { api } from "@/api";
import { Context } from "@/context";
import { convutils } from "./convutils";

export async function addEvent(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('[Добавление меропрития]')

  await ctx.reply('1/4: Введите название мероприятия')
  const eventTitle = await conversation.form.text()

  await ctx.reply('2/4: Введите дату начала мероприятия')
  const eventStartDate = await convutils.upcomingDate(conversation, ctx);

  await ctx.reply('3/4: Введите дату конца мероприятия (опционально)')
  const eventEndDate = await convutils.upcomingDateOptional(conversation, ctx);

  await ctx.reply('4/4: Добавьте ссылку на подробности (опционально)')
  const eventLink = await convutils.urlOptional(conversation, ctx)

  await conversation.external(async () => {
    await api.events.createEvent({
      title: eventTitle,
      type: EventType.COMMON,
      startDate: eventStartDate.toISOString(),
      endDate: eventEndDate?.toISOString(),
      link: eventLink,
      isPublic: true,
    })
  })

  await ctx.reply('Мероприятие добавлено')
}
