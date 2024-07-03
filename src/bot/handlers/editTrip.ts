import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const editTripHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("editTrip")
}