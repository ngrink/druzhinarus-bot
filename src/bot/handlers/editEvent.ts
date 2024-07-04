import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { editEventMenu } from "@/menu";
import { eventsService } from "@/modules/events";

export const editEventMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const events = await eventsService.getCommonEvents();
  if (!events.length) {
    await ctx.reply('Нет доступных мероприятий')
    return
  }

  await ctx.reply('Выберите мероприятие для изменения', {
    reply_markup: editEventMenu
  })
}

