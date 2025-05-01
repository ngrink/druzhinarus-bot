import { Conversation } from "@grammyjs/conversations";

<<<<<<< Updated upstream:src/bot/conversations/convutils/int.ts
import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";
=======
import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";
>>>>>>> Stashed changes:services/telegram/src/conversations/convutils/int.ts

export const int = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const text = await conversation.form.text()
      const number = parseInt(text)

      if (isNaN(number)) {
        await ctx.reply('Введите целое число')
        continue
      }

      return number
    } catch (e) {
      await ctx.reply('Введите целое число')
    }
  }
}

export const intOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    try {
      const text = await conversation.form.text()
      if (text === SKIP_SYMBOL) {
        return
      }

      const number = parseInt(text)

      if (isNaN(number)) {
        await ctx.reply('Введите целое число')
        continue
      }

      return number
    } catch (e) {
      await ctx.reply('Введите целое число')
    }
  }
}
