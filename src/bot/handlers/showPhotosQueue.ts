import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { photosService } from "@/modules/photos";
import { chunkArray } from "@/helpers";


export const showPhotosQueue: Middleware<Context> = async (ctx: Context) => {
  const photos = await photosService.getUnusedPhotos()
  if (!photos.length) {
    await ctx.reply('Очередь фотографий пуста')
    return
  }

  const groups = chunkArray(photos, 10)
  
  groups.map(async (group, gidx) => {
    await ctx.replyWithMediaGroup(
      group.map((photo, pidx) => ({
        media: photo.fileId,
        type: "photo", 
        caption: pidx == 0 ? `${gidx * 10 + 1}-${gidx * 10 + group.length}`: undefined
      })),
    )
  })
}