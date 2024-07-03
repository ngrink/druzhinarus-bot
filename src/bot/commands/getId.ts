import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const getIdCommand: Middleware<Context> = async (ctx) => {
  if (ctx.from?.id) {
    await ctx.reply(`Ваш ID: ${String(ctx.from?.id)}`)
  }
}