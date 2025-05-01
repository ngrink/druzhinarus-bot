import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";
import { editEventMenu } from "@/menu";

export const editEventMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await api.events.getEvents()
    .then(res => res.data)

  if (!events.length) {
    await ctx.reply('Нет доступных мероприятий')
    return
  }

  await ctx.reply('Выберите мероприятие для изменения', {
    reply_markup: editEventMenu
  })
}
