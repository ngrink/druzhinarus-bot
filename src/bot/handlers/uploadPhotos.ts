import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { photosService } from "@/modules/photos";


const groups: {[groupId: string]: string[]} = {}

export const uploadPhotosHandler: Middleware<Context> = async (ctx: Context) => {
  // Single photo
  if (!ctx.message?.media_group_id) {
    if (!ctx.message?.photo) {
      throw new Error("No photo specified")
    }
  
    const photo = ctx.message?.photo[ctx.message?.photo?.length-1]
    const data = [{fileId: photo.file_id}]
  
    await photosService.createPhotos(data)
    
    const count = await photosService.countUnusedPhotos()
    ctx.reply(`Фотографии загружены: в очереди ${count} фотографий`)
  } else {
    // Multiple photos
    const groupId = ctx.message.media_group_id
    if (!groups[groupId]) {
      groups[groupId] = []

      setTimeout(async () => {
        await photosService.createPhotos(groups[groupId].map(fileId => ({
          fileId: fileId,
          groupId: groupId
        })))

        const count = await photosService.countUnusedPhotos()
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