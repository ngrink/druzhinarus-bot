import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { photosService } from "@/modules/photos";
import { chunkArray, getWordWithEnding } from "@/helpers";


export const showPhotosQueue: Middleware<Context> = async (ctx: Context) => {
  const photos = await photosService.getUnusedPhotos()
  if (!photos.length) {
    await ctx.reply('Очередь фотографий пуста')
    return
  }

  const n = photos.length
  const groups = chunkArray(photos, 10)
  
  await Promise.allSettled(
    groups.map(group => {
      return ctx.replyWithMediaGroup(
        group.map(photo => ({
          media: photo.fileId,
          type: "photo"
        })),
      )
    })
  )

  await ctx.reply(`В очереди ${n} ${getWordWithEnding(n, 'фотограф', ['ия', 'ии', 'ий'])}`)
}