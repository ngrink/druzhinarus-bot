import { Conversation } from "@grammyjs/conversations";

import { api } from "@/api";
import { Context } from "@/context";
import { convutils } from "./convutils";

export async function addTrip(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('[Добавление похода]')

  await ctx.reply('1/7: Введите название похода')
  const eventTitle = await conversation.form.text()

  await ctx.reply('2/7: Введите дату начала похода')
  const eventStartDate = await convutils.upcomingDate(conversation, ctx)

  await ctx.reply('3/7: Введите дату конца похода (опционально)')
  const eventEndDate = await convutils.upcomingDateOptional(conversation, ctx)

  await ctx.reply('4/7: Добавьте ссылку на подробности (опционально)')
  const eventLink = await convutils.urlOptional(conversation, ctx)

  await ctx.reply('5/7: Укажите цену (опционально)')
  const eventPrice = await convutils.intOptional(conversation, ctx)

  await ctx.reply('6/7: Укажите цену по скидке (опционально)')
  const eventDiscountedPrice = await convutils.intOptional(conversation, ctx)

  let eventDiscountEndDate: Date | undefined;

  if (eventDiscountedPrice) {
    await ctx.reply('7/7: Введите дату окончания скидки (опционально)')
    eventDiscountEndDate = await convutils.upcomingDateOptional(conversation, ctx)
  }

  await conversation.external(async () => {
    await api.events.createEvent({
      title: eventTitle,
      type: "TRIP",
      startDate: eventStartDate.toISOString(),
      endDate: eventEndDate?.toISOString(),
      link: eventLink,
      isPublic: true,
      price: eventPrice,
      discountedPrice: eventDiscountedPrice,
      discountEndDate: eventDiscountEndDate?.toISOString(),
    })
  })

  await ctx.reply('Поход добавлен')
}
