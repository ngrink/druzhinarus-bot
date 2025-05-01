import { Middleware } from "grammy";
import { Context } from "@/context";

export const cancelCommand: Middleware<Context> = async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("Операция отменена");
}
