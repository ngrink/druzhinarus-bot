import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const addEventHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("addEvent")
}