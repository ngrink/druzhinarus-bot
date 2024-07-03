import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { formatMessage } from "@/helpers";

export const signupTripHandler: Middleware<Context> = (ctx: Context) => {
  ctx.reply(formatMessage`
    В разработке
  `)
}