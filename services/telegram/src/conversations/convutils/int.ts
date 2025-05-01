import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";

export const int = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    try {
      const text = await conversation.form.text();
      const number = parseInt(text);

      if (isNaN(number)) {
        await ctx.reply("Введите целое число");
        continue;
      }

      return number;
    } catch (e) {
      await ctx.reply("Введите целое число");
    }
  }
};

export const intOptional = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    try {
      const text = await conversation.form.text();
      if (text === SKIP_SYMBOL) {
        return;
      }

      const number = parseInt(text);

      if (isNaN(number)) {
        await ctx.reply("Введите целое число");
        continue;
      }

      return number;
    } catch (e) {
      await ctx.reply("Введите целое число");
    }
  }
};
