import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";
import { ru } from "date-fns/locale";

import { Context } from "@/bot/context";
import { formatEvent, formatMessage, isURL, parseEmpty } from "@/helpers";
import { eventsService } from "@/modules/events";

export async function editTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)
  const event = await eventsService.getEvent(eventId)
  
  if (!event) {
    await ctx.reply('Поход не найден')
    return
  }
  
  await ctx.reply(formatMessage`
    [Изменение похода]
    ${formatEvent(event)}
  `, {
    parse_mode: "HTML",
    // @ts-ignore
    disable_web_page_preview: true,
  })

  await ctx.reply('1/4: Введите новое название похода')
  const eventTitle = parseEmpty(await conversation.form.text())

  await ctx.reply(formatMessage`
    2/4: *Введите новую дату начала похода
  `)
  
  let eventStartDate;
  let parsedEventStartDate: Date | undefined;

  while (true) {
    try {
      eventStartDate = parseEmpty(await conversation.form.text())
      if (!eventStartDate) {
        break
      }

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
    3/4: Введите новую дату конца похода
  `)

  let eventEndDate;
  let parsedEventEndDate: Date | undefined;

  while (true) {
    try {
      eventEndDate = parseEmpty(await conversation.form.text())
      if (!eventEndDate) {
        break
      }

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

  await ctx.reply('4/4: Добавьте новую ссылку на подробности')
  let eventLink = parseEmpty(await conversation.form.text())

  while (eventLink && !isURL(eventLink)) {
    await ctx.reply('Неверный формат ссылки. Пожалуйста, введите корректную ссылку или поставьте знак "-" для пропуска')
    eventLink = parseEmpty(await conversation.form.text())
  }

  await conversation.external(async () => {
    await eventsService.updateEvent(eventId, {
      title: eventTitle,
      startDate: parsedEventStartDate,
      endDate: parsedEventEndDate,
      link: eventLink, 
    })
  })

  await ctx.reply(formatMessage`Поход изменен`)
}