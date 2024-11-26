import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { formatMember, formatMessage, sendNotifications } from "@/helpers";
import { usersService } from "@/modules/users";
import { eventsService } from "@/modules/events";
import { convutils } from "./convutils";

export async function signupTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)
  const userId = ctx.from!.id

  const event = await eventsService.getEvent(eventId)
  const member = await eventsService.getEventMember(eventId, userId)
  if (member) {
    await ctx.reply('Вы уже записаны на этот поход')
    return
  }

  let user = await usersService.getUser(userId)

  let fullname: string;
  let phone: string;
  let birthday: Date;
  let vk: string;

  if (!user.fullname) {
    await ctx.reply('1/5: Введите ваше ФИО')
    fullname = await convutils.fullname(conversation, ctx)
  }

  if (!user.birthday) {
    await ctx.reply('2/5: Введите дату рождения')
    birthday = await convutils.shortDate(conversation, ctx)
  }

  if (!user.phone) {
    await ctx.reply('3/5: Введите ваш номер телефона')
    phone = await convutils.phone(conversation, ctx)
  }

  if (!user.vk) {
    await ctx.reply('4/5: Введите ссылку на свой профиль ВК')
    vk = await convutils.vk(conversation, ctx)
  }

  if (!user.fullname || !user.phone || !user.birthday || !user.vk) {
    await ctx.reply('5/5: Согласен на обработку персональных данных (да)')

    const confirm = await convutils.confirm(conversation, ctx)
    if (!confirm) {
      await ctx.reply('Отмена записи')
      return
    }
  }

  await conversation.external(async () => {
    if (fullname || birthday || phone || vk) {
      user = await usersService.updateUser(user.id, {
        fullname: fullname,
        phone: phone,
        birthday: birthday,
        vk: vk,
      })
    }

    await eventsService.signupToEvent(eventId, userId)
    await sendNotifications(ctx, formatMessage`
      Новый участник похода "${event?.title}"

      ${formatMember(user)}
    `)
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
