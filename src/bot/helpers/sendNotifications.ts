import { Context } from "@/bot/context"
import { notificationChatIds } from "@/data"

export const sendNotifications = async (ctx: Context, message: string) => {
  await Promise.allSettled(
    notificationChatIds.map(chatId => ctx.api.sendMessage(chatId, message, {
      parse_mode: "HTML",
      // @ts-ignore
      disable_web_page_preview: true,
    }))
  )
}