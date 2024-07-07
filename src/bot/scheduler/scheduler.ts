import schedule from "node-schedule"

import { bot } from "@/main"
import { photosService } from "@/modules/photos"
import { distributionChatIds } from "@/data"

const sendingPhotosJob = schedule.scheduleJob("0 18,21 * * *", async () => {
  const photo = await photosService.getNextUnusedPhoto()
  if (!photo) {
    return
  }

  Promise.allSettled(
    distributionChatIds.map(chatId => { 
      return bot.api.sendMediaGroup(chatId, [
        {
          media: photo.fileId,
          type: "photo"
        }
      ])
    })
  )

  await photosService.updatePhoto(photo.id, { isUsed: true })
})