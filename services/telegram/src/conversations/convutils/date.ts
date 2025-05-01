import { Conversation } from "@grammyjs/conversations";
import { parse } from "date-fns";
import { ru } from "date-fns/locale";

import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";

export const date = async (conversation: Conversation<Context>, ctx: Context) => {
  let text: string;
  let date: Date;

  while (true) {
    try {
      text = await conversation.form.text()

      date = parse(text, 'd MMMM y', new Date(), {locale: ru})
      if (!Number.isNaN(date.valueOf())) {
        return date
      }

      date = parse(text, 'd MMMM', new Date(), {locale: ru})
      if (!Number.isNaN(date.valueOf())) {
        return date
      }

      await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
    } catch (e) {
      await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
    }
  }
}

export const dateOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  let text: string;
  let date: Date;

  while (true) {
    try {
      text = await conversation.form.text()
      if (text == SKIP_SYMBOL) {
        return
      }

      date = parse(text, 'd MMMM y', new Date(), {locale: ru})
      if (!Number.isNaN(date.valueOf())) {
        return date
      }

      date = parse(text, 'd MMMM', new Date(), {locale: ru})
      if (!Number.isNaN(date.valueOf())) {
        return date
      }

      await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
    } catch (e) {
      await ctx.reply('Неверный формат даты. Пожалуйста, введите дату в формате "01 января [0000]"')
    }
  }
}
