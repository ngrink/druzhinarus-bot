import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const deleteTripHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("deleteTrip")
}