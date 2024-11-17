import { Middleware } from "grammy";

import { formatMessage } from "@/helpers";
import { Context } from "@/bot/context";


export const helpCommand: Middleware<Context> = async (ctx: Context) => {
  ctx.reply(formatMessage`
    Справка по использованию чат-бота

    В разработке
  `, {
    parse_mode: 'Markdown',
    // @ts-ignore
    disable_web_page_preview: true,
  });
}
