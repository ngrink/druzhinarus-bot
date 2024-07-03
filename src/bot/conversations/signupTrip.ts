import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";
import { ru } from "date-fns/locale";

import { Context } from "@/bot/context";
import { formatEvents, formatMessage } from "@/helpers";
import { usersService } from "@/modules/users";
import { eventsService } from "@/modules/events";

export async function signupTrip(conversation: Conversation<Context>, ctx: Context) {
  const user = await usersService.getUser(ctx.from!.id)
  const trips = await eventsService.getTripEvents()
  const tripsFormatted = formatEvents(trips, { id: true })

  let fullname: string;
  let phone: string;
  let birthday: Date;

  if (!trips.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('[Запись в поход]')

  await ctx.reply(tripsFormatted, {
    parse_mode: 'HTML',
    // @ts-ignore
    disable_web_page_preview: true,
  })

  await ctx.reply('1/5: *Выберите номер похода')
  const number = await conversation.form.int()
  const event = trips[number-1]

  if (!user.fullname) {
    await ctx.reply('2/5: *Введите ваше ФИО')
    fullname = await conversation.form.text()
  }

  if (!user.birthday) {
    await ctx.reply('3/5: *Дата рождения')
  
    while (true) {
      try {
        const birthdayString = await conversation.form.text()
        birthday = parse(birthdayString, 'dd.MM.y', new Date())
  
        if (!Number.isNaN(birthday.valueOf())) {
          break;
        } else {
          await ctx.reply('Неверный формат. Пожалуйста, введите дату в формате "00.00.0000"')
        }
      } catch (e) {
        await ctx.reply('Неверный формат. Пожалуйста, введите дату в формате "00.00.0000"')
      }
    }
  }

  if (!user.phone) {
    await ctx.reply('4/5: *Введите ваш номер телефона')
  
    while (true) {
      phone = await conversation.form.text()
      if (phone.match(/^\+7\d{10}$/)) {
        break;
      } else {
        await ctx.reply('Неверный формат. Пожалуйста, введите номер телефона в формате "+7XXXXXXXXXX"')
      }
    }
  }

  if (!user.fullname || !user.phone || !user.birthday) {
    await ctx.reply('5/5: *Согласен на обработку персональных данных (да)')
    const confirm = await conversation.form.text()
    if (confirm.toLocaleLowerCase() != "да") {
      await ctx.reply('Отмена записи')
      return
    }
  }
  
  await conversation.external(async () => {
    if (fullname || birthday || phone) {
      await usersService.updateUser(user.id, {
        fullname: fullname, 
        phone: phone,
        birthday: birthday,
      })
    }

    await eventsService.signupToEvent(event.id, user.id)
  })

  await ctx.reply(`Вы успешно записались в поход`)
}