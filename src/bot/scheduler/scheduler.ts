import schedule from "node-schedule"

import { bot } from "@/main"
import { photosService } from "@/modules/photos"
import { distributionChatIds } from "@/data"
import { settingsService } from "@/modules/settings"


let sendingPhotosJob: schedule.Job;

(async function scheduler() {
  const settings = await settingsService.getSettings()
  
  sendingPhotosJob = schedule.scheduleJob(settings.photoSchedulerSpec, async () => {
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
}());

export const rescheduleSendingPhotosJob = (spec: string) => {
  if (!sendingPhotosJob) {
    return
  }
  sendingPhotosJob.reschedule(spec)
}