import { Middleware } from "grammy";
import { Context } from "@/bot/context";
import { deleteTripMenu } from "@/menu";
import { eventsService } from "@/modules/events";

export const deleteTripMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await eventsService.getTripEvents();
  if (!events.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('Выберите поход для удаления', {
    reply_markup: deleteTripMenu
  })
}