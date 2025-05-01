import { Middleware } from "grammy";

import { Context } from "@/context";
import { formatMessage } from "@/shared/helpers";

export const unhandledMessageHandler: Middleware<Context> = async (ctx: Context) => {
  const res = await ctx.reply(formatMessage`
    В разработке
  `)
}
