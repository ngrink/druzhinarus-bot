import { Conversation } from "@grammyjs/conversations";

<<<<<<< Updated upstream:src/bot/conversations/convutils/number.ts
import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";
=======
import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";
>>>>>>> Stashed changes:services/telegram/src/conversations/convutils/number.ts

export const number = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const text = await conversation.form.text()
      const number = Number(text)

      if (isNaN(number)) {
        await ctx.reply('Введите число')
        continue
      }

      return number
    } catch (e) {
      await ctx.reply('Введите число')
    }
  }
}

export const numberOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const text = await conversation.form.text()
      if (text === SKIP_SYMBOL) {
        return
      }

      const number = Number(text)

      if (isNaN(number)) {
        await ctx.reply('Введите число')
        continue
      }

      return number
    } catch (e) {
      await ctx.reply('Введите число')
    }
  }
}
