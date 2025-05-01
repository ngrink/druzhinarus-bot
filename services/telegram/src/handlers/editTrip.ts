import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";
import { editTripMenu } from "@/menu";

export const editTripMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await api.events.getEvents("TRIP")
    .then(res => res.data)

  if (!events.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('Выберите походы для изменения', {
    reply_markup: editTripMenu
  })
}
