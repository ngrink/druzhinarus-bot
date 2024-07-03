import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const deleteEventHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("deleteEvent")
}