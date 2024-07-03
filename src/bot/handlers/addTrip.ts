import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const addTripHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("addTrip")
}