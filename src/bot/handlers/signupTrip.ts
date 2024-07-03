import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { formatMessage } from "@/helpers";

export const signupTripHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("signupTrip")
}