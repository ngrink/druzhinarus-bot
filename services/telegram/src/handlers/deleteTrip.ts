import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";
import { deleteTripMenu } from "@/menu";

export const deleteTripMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await api.events.getEvents("TRIP")
    .then(res => res.data)

  if (!events.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('Выберите поход для удаления', {
    reply_markup: deleteTripMenu
  })
}
