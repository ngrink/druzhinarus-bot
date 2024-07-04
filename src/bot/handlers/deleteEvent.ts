import { Middleware } from "grammy";
import { Context } from "@/bot/context";
import { eventsService } from "@/modules/events";
import { deleteEventMenu } from "@/menu";

export const deleteEventMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await eventsService.getCommonEvents();
  if (!events.length) {
    await ctx.reply('Нет доступных мероприятий')
    return
  }

  await ctx.reply('Выберите мероприятие для удаления', {
    reply_markup: deleteEventMenu
  })
}