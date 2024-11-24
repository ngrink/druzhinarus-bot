import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { eventsService } from "@/modules/events";
import { convutils } from "./convutils";

export async function addTrip(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('[Добавление похода]')

  await ctx.reply('1/4: Введите название похода')
  const eventTitle = await conversation.form.text()

  await ctx.reply('2/4: Введите дату начала похода')
  const eventStartDate = await convutils.upcomingDate(conversation, ctx)

  await ctx.reply('3/4: Введите дату конца похода (опционально)')
  const eventEndDate = await convutils.upcomingDateOptional(conversation, ctx)

  await ctx.reply('4/4: Добавьте ссылку на подробности (опционально)')
  const eventLink = await convutils.linkOptional(conversation, ctx)

  await conversation.external(async () => {
    await eventsService.createEvent({
      title: eventTitle,
      type: "TRIP",
      startDate: eventStartDate,
      endDate: eventEndDate,
      link: eventLink,
      isPublic: true,
    })
  })

  await ctx.reply('Поход добавлен')
}
