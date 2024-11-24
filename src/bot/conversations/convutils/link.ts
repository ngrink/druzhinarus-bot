import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { isURL } from "@/helpers";
import { SKIP_SYMBOL } from "@/constants";

export const link = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const url = await conversation.form.text()
      if (isURL(url)) {
        return url
      }

      await ctx.reply('Неверный формат ссылки. Пожалуйста, введите корректную ссылку или поставьте знак "-" для пропуска')
    } catch (e) {
      await ctx.reply('Неверный формат ссылки. Пожалуйста, введите корректную ссылку или поставьте знак "-" для пропуска')
    }
  }
}

export const linkOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const url = await conversation.form.text()
      if (url == SKIP_SYMBOL) {
        return
      }

      if (isURL(url)) {
        return url
      }

      await ctx.reply('Неверный формат ссылки. Пожалуйста, введите корректную ссылку или поставьте знак "-" для пропуска')
    } catch (e) {
      await ctx.reply('Неверный формат ссылки. Пожалуйста, введите корректную ссылку или поставьте знак "-" для пропуска')
    }
  }
}
