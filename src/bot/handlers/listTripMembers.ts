import { Middleware } from "grammy";
import { Context } from "@/bot/context";

export const listTripMembers: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("listTripMembers")
}