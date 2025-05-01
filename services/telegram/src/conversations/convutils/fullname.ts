import { Conversation } from "@grammyjs/conversations";

<<<<<<< Updated upstream:src/bot/conversations/convutils/fullname.ts
import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";
=======
import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";
>>>>>>> Stashed changes:services/telegram/src/conversations/convutils/fullname.ts


export const fullname = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    const fullname = await conversation.form.text()

    if (fullname.split(" ").length !== 3) {
      await ctx.reply('Пожалуйста, введите полное ФИО')
      continue
    }

    return fullname
  }
}

export const fullnameOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    const fullname = await conversation.form.text()

    if (fullname == SKIP_SYMBOL) {
      return
    }

    if (fullname.split(" ").length !== 3) {
      await ctx.reply('Пожалуйста, введите полное ФИО')
      continue
    }

    return fullname
  }
}
