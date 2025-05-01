import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";

export const number = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    try {
      const text = await conversation.form.text();
      const number = Number(text);

      if (isNaN(number)) {
        await ctx.reply("Введите число");
        continue;
      }

      return number;
    } catch (e) {
      await ctx.reply("Введите число");
    }
  }
};

export const numberOptional = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    try {
      const text = await conversation.form.text();
      if (text === SKIP_SYMBOL) {
        return;
      }

      const number = Number(text);

      if (isNaN(number)) {
        await ctx.reply("Введите число");
        continue;
      }

      return number;
    } catch (e) {
      await ctx.reply("Введите число");
    }
  }
};
