import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { formatMessage } from "@/helpers";

export const faqHandler: Middleware<Context> = async (ctx: Context) => {
  const res = await ctx.reply(formatMessage`
    В разработке
  `)
}