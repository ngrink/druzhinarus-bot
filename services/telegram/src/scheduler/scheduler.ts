import schedule from "node-schedule";

import { bot } from "@/main";
import { api } from "@/api";
import config from "@/config";

let sendingPhotosJob: schedule.Job;

(async function scheduler() {
  const settings = await api.settings
    .getSettings()
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

  sendingPhotosJob = schedule.scheduleJob(
    settings.photoSchedulerSpec,
    async () => {
      const photo = await api.photos
        .getNextUnusedPhoto()
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(err);
          return;
        });

      if (!photo) {
        return;
      }

      Promise.allSettled(
        config.distributionChatIds.map((chatId: number) => {
          return bot.api.sendMediaGroup(chatId, [
            {
              media: photo.fileId,
              type: "photo",
            },
          ]);
        })
      );

      await api.photos.updatePhoto(photo.id, { isUsed: true });
    }
  );
})();

export const rescheduleSendingPhotosJob = (spec: string) => {
  if (!sendingPhotosJob) {
    return;
  }
  sendingPhotosJob.reschedule(spec);
};
