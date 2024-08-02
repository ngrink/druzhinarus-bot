import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { editPhotosScheduleMenu } from "@/menu";

export const editPhotosScheduleHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.reply('Выберите время публикации постов', {
    reply_markup: editPhotosScheduleMenu 
  })
}