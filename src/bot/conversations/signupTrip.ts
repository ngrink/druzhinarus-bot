import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";
import { ru } from "date-fns/locale";

import { Context } from "@/bot/context";
import { formatEvents, formatMessage } from "@/helpers";
import { usersService } from "@/modules/users";
import { eventsService } from "@/modules/events";

export async function signupTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)
  const userId = ctx.from!.id
  const member = await eventsService.getEventMember(eventId, userId)
  if (member) {
    await ctx.reply('Вы уже записаны на этот поход')
    return
  }

  const user = await usersService.getUser(userId)

  let fullname: string;
  let phone: string;
  let birthday: Date;

  if (!user.fullname) {
    await ctx.reply('1/4: *Введите ваше ФИО')
    fullname = await conversation.form.text()
  }

  if (!user.birthday) {
    await ctx.reply('2/4: *Введите дату рождения')
  
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
    await ctx.reply('3/4: *Введите ваш номер телефона')
  
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
    await ctx.reply('4/4: *Согласен на обработку персональных данных (да)')
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

    await eventsService.signupToEvent(eventId, userId)
  })

  await ctx.reply(formatMessage`
    Ваша заявка на участие в походе принята. Ознакомьтесь со следующей информацией, чтобы подготовится к походу
  `, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Руководство', url: 'https://vk.com/topic-9577978_34500403' },
        ]
      ]
    },
    // @ts-ignore
    disable_web_page_preview: true,
  })
}