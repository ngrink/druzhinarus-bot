import { Conversation } from "@grammyjs/conversations";

import { formatMember, formatMessage } from "@/shared/helpers";

import { api } from "@/api";
import { Context } from "@/context";
import { sendNotifications } from '@/helpers';
import { convutils } from "./convutils";
import { UserDto } from "@/shared/generated/prisma/types/user.dto";
import { parseISO } from "date-fns";

export async function signupTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)
  const userId = ctx.from!.id

  const event = await api.events.getEvent(eventId)
    .then(res => res.data)
  const member = await api.events.getEventMember(eventId, userId)
    .then(res => res.data)

  if (member) {
    await ctx.reply('Вы уже записаны на этот поход')
    return
  }

  let account = await api.accounts.getAccount("TELEGRAM", userId)
    .then(res => res.data)

  let fullname: string;
  let phone: string;
  let birthday: Date;
  let vk: string;

  if (!account.user.fullname) {
    await ctx.reply('1/5: Введите ваше ФИО')
    fullname = await convutils.fullname(conversation, ctx)
  }

  if (!account.user.birthday) {
    await ctx.reply('2/5: Введите дату рождения')
    birthday = await convutils.shortDate(conversation, ctx)
  }

  if (!account.user.phone) {
    await ctx.reply('3/5: Введите ваш номер телефона')
    phone = await convutils.phone(conversation, ctx)
  }

  if (!account.user.vk) {
    await ctx.reply('4/5: Введите ссылку на свой профиль ВК')
    vk = await convutils.vk(conversation, ctx)
  }

  if (
    !account.user.fullname ||
    !account.user.phone ||
    !account.user.birthday ||
    !account.user.vk
  ) {
    await ctx.reply('5/5: Согласен на обработку персональных данных (да)')

    const confirm = await convutils.confirm(conversation, ctx)
    if (!confirm) {
      await ctx.reply('Отмена записи')
      return
    }
  }

  await conversation.external(async () => {
    if (fullname || birthday || phone || vk) {
      account.user = await api.users.updateUser(account.user.id, {
        fullname: fullname,
        phone: phone,
        birthday: birthday.toISOString(),
        vk: vk,
      })
        .then(res => res.data)
    }

    await api.events.signupToEvent(eventId, {userId})
    await sendNotifications(ctx, formatMessage`
      Новый участник похода "${event?.title}"

      ${formatMember({
        id: account.user.id,
        fullname: account.user.fullname,
        email: account.user.email,
        phone: account.user.phone,
        birthday: account.user.birthday ? parseISO(account.user.birthday) : null,
        vk: account.user.vk,
        role: account.user.role,
      })}
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
