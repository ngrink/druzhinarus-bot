import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";
import { ru } from "date-fns/locale";

import { Context } from "@/bot/context";
import { formatMessage, isURL, parseEmpty } from "@/helpers";
import { eventsService } from "@/modules/events";

export async function addEvent(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('[Добавление меропрития]')

  await ctx.reply('1/4: *Введите название мероприятия')
  const eventTitle = await conversation.form.text()

  await ctx.reply(formatMessage`
    2/4: *Введите дату начала мероприятия
  `)
  
  let eventStartDate;
  let parsedEventStartDate: Date | undefined;;

  while (true) {
    try {
      eventStartDate = await conversation.form.text()
      parsedEventStartDate = parse(eventStartDate, 'd MMMM y', new Date(), {locale: ru})
      if (!Number.isNaN(parsedEventStartDate.valueOf())) {
        break;
      } 
      
      parsedEventStartDate = parse(eventStartDate, 'd MMMM', new Date(), {locale: ru})
      if (!Number.isNaN(parsedEventStartDate.valueOf())) {
        break;
      } else {
        await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
      }
    } catch (e) {
      await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
    }
  }

  await ctx.reply(formatMessage`
    3/4: Введите дату конца мероприятия
  `)

  let eventEndDate;
  let parsedEventEndDate: Date | undefined;

  while (true) {
    try {
      eventEndDate = await conversation.form.text()
      parsedEventEndDate = parse(eventEndDate, 'd MMMM y', new Date(), {locale: ru})
      if (!Number.isNaN(parsedEventEndDate.valueOf())) {
        break;
      } 
      
      parsedEventEndDate = parse(eventEndDate, 'd MMMM', new Date(), {locale: ru})
      if (!Number.isNaN(parsedEventEndDate.valueOf())) {
        break;
      } else {
        await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
      }
    } catch (e) {
      await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
    }
  }

  await ctx.reply('4/4: Добавьте ссылку на подробности')
  let eventLink = parseEmpty(await conversation.form.text())

  while (eventLink && !isURL(eventLink)) {
    await ctx.reply('Неверный формат ссылки. Пожалуйста, введите корректную ссылку или поставьте знак "-" для пропуска')
    eventLink = parseEmpty(await conversation.form.text())
  }

  await conversation.external(async () => {
    await eventsService.createEvent({
      title: eventTitle,
      type: "COMMON",
      startDate: parsedEventStartDate,
      endDate: parsedEventEndDate,
      link: eventLink,
      isPublic: true,      
    })
  })

  await ctx.reply(formatMessage`Мероприятие добавлено`)
}