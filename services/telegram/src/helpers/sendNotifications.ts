<<<<<<< Updated upstream:src/bot/helpers/sendNotifications.ts
import { Context } from "@/bot/context"
import { notificationChatIds } from "@/config"
=======
import { Context } from "@/context"
import config from "@/config"
>>>>>>> Stashed changes:services/telegram/src/helpers/sendNotifications.ts

export const sendNotifications = async (ctx: Context, message: string) => {
  await Promise.allSettled(
    config.notificationChatIds.map(chatId => ctx.api.sendMessage(chatId, message, {
      parse_mode: "HTML",
      // @ts-ignore
      disable_web_page_preview: true,
    }))
  )
}
