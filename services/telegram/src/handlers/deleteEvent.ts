import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";
import { deleteEventMenu } from "@/menu";

export const deleteEventMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await api.events.getEvents(undefined, true)
    .then(res => res.data)

  if (!events.length) {
    await ctx.reply('Нет доступных мероприятий')
    return
  }

  await ctx.reply('Выберите мероприятие для удаления', {
    reply_markup: deleteEventMenu
  })
}
