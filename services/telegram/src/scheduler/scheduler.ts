import schedule from "node-schedule"

import { bot } from "@/main"
<<<<<<< Updated upstream:src/bot/scheduler/scheduler.ts
import { photosService } from "@/modules/photos"
import { distributionChatIds } from "@/config"
import { settingsService } from "@/modules/settings"

=======
import { api } from "@/api";
import config from "@/config"
>>>>>>> Stashed changes:services/telegram/src/scheduler/scheduler.ts

let sendingPhotosJob: schedule.Job;

(async function scheduler() {
<<<<<<< Updated upstream:src/bot/scheduler/scheduler.ts
  const settings = await settingsService.getSettings()
=======
  const settings = await api.settings.getSettings()
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err)
      throw err
    })
>>>>>>> Stashed changes:services/telegram/src/scheduler/scheduler.ts

  sendingPhotosJob = schedule.scheduleJob(settings.photoSchedulerSpec, async () => {
    const photo = await api.photos.getNextUnusedPhoto()
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.error(err);
        return
      })

    if (!photo) {
      return
    }

    Promise.allSettled(
<<<<<<< Updated upstream:src/bot/scheduler/scheduler.ts
      distributionChatIds.map(chatId => {
=======
      config.distributionChatIds.map((chatId: number) => {
>>>>>>> Stashed changes:services/telegram/src/scheduler/scheduler.ts
        return bot.api.sendMediaGroup(chatId, [
          {
            media: photo.fileId,
            type: "photo"
          }
        ])
      })
    )

<<<<<<< Updated upstream:src/bot/scheduler/scheduler.ts
    await photosService.updatePhoto(photo.id, { isUsed: true })
=======
    await api.photos.updatePhoto(photo.id, { isUsed: true })
>>>>>>> Stashed changes:services/telegram/src/scheduler/scheduler.ts
  })
}());

export const rescheduleSendingPhotosJob = (spec: string) => {
  if (!sendingPhotosJob) {
    return
  }
  sendingPhotosJob.reschedule(spec)
}
