import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { photosService } from "@/modules/photos";

export const clearPhotosQueue: Middleware<Context> = async (ctx: Context) => {
  await photosService.deleteAllPhotos()
  await ctx.reply('Очередь удалена')
}