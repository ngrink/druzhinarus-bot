import { Context } from "grammy";

export const isPrivateChatFilter = (ctx: Context) => {
  return ctx.chat?.type === "private"
}