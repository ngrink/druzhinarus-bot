import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";

import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";

export const shortDate = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const text = await conversation.form.text()

      const date = parse(text, 'dd.MM.y', new Date())
      if (Number.isNaN(date.valueOf())) {
        await ctx.reply('Неверный формат. Пожалуйста, введите дату в формате "00.00.0000"')
        continue
      }

      return date
    } catch (e) {
      await ctx.reply('Неверный формат. Пожалуйста, введите дату в формате "00.00.0000"')
    }
  }
}

export const shortDateOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const text = await conversation.form.text()
      if (text == SKIP_SYMBOL) {
        return
      }

      const date = parse(text, 'dd.MM.y', new Date())
      if (Number.isNaN(date.valueOf())) {
        await ctx.reply('Неверный формат. Пожалуйста, введите дату в формате "00.00.0000"')
        continue
      }

      return date
    } catch (e) {
      await ctx.reply('Неверный формат. Пожалуйста, введите дату в формате "00.00.0000"')
    }
  }
}
