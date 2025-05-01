import { Middleware } from "grammy";

<<<<<<< Updated upstream:src/bot/commands/help.ts
import { formatMessage } from "@/helpers";
import { Context } from "@/bot/context";
=======
import { formatMessage } from "@/shared/helpers";
import { Context } from "@/context";
>>>>>>> Stashed changes:services/telegram/src/commands/help.ts


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
