import { Context } from "@/context";
import config from "@/config";

export const sendNotifications = async (ctx: Context, message: string) => {
  await Promise.allSettled(
    config.notificationChatIds.map((chatId) =>
      ctx.api.sendMessage(chatId, message, {
        parse_mode: "HTML",
        // @ts-ignore
        disable_web_page_preview: true,
      })
    )
  );
};
