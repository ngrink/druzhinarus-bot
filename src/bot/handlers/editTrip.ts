import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { editTripMenu } from "@/menu";
import { eventsService } from "@/modules/events";

export const editTripMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await eventsService.getTripEvents();
  if (!events.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('Выберите походы для изменения', {
    reply_markup: editTripMenu
  })
}