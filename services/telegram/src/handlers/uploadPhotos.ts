import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";


const groups: {[groupId: string]: string[]} = {}

export const uploadPhotosHandler: Middleware<Context> = async (ctx: Context) => {
  // Single photo
  if (!ctx.message?.media_group_id) {
    if (!ctx.message?.photo) {
      throw new Error("No photo specified")
    }

    const photo = ctx.message?.photo[ctx.message?.photo?.length-1]
    const data = [{fileId: photo.file_id}]

    await api.photos.createPhotos(data)

    const count = await api.photos.countUnusedPhotos()
    ctx.reply(`Фотографии загружены: в очереди ${count} фотографий`)
  } else {
    // Multiple photos
    const groupId = ctx.message.media_group_id
    if (!groups[groupId]) {
      groups[groupId] = []

      setTimeout(async () => {
        await api.photos.createPhotos(groups[groupId].map(fileId => ({
          fileId: fileId,
          groupId: groupId
        })))

        const count = await api.photos.countUnusedPhotos()
        ctx.reply(`Фотографии загружены: в очереди ${count} фотографий`)
      }, 1000)
    }

    if (!ctx.message?.photo) {
      throw new Error("No photo specified")
    }

    const photo = ctx.message?.photo[ctx.message?.photo?.length-1]
    groups[groupId].push(photo.file_id)
  }
}
