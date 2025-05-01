import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";
import { chunkArray } from "@/shared/helpers";


export const showPhotosQueue: Middleware<Context> = async (ctx: Context) => {
  const photos = await api.photos.getUnusedPhotos()
    .then(res => res.data)

  if (!photos.length) {
    await ctx.reply('Очередь фотографий пуста')
    return
  }

  const groups = chunkArray(photos, 10)

  for (let gidx = 0; gidx < groups.length; gidx++) {
    const group = groups[gidx];
    await ctx.replyWithMediaGroup(
      group.map((photo, pidx) => ({
        media: photo.fileId,
        type: "photo",
        caption: pidx == 0 ? `${gidx * 10 + 1}-${gidx * 10 + group.length}`: undefined
      })),
    )
  }
}
