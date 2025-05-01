import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";

export const clearPhotosQueue: Middleware<Context> = async (ctx: Context) => {
  await api.photos.deleteAllPhotos()
  await ctx.reply('Очередь удалена')
}
