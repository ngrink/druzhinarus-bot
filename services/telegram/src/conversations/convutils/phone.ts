import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";

export const phone = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    const phone = await conversation.form.text();

    if (!phone.match(/^\+7\d{10}$/)) {
      await ctx.reply(
        'Неверный формат. Пожалуйста, введите номер телефона в формате "+7XXXXXXXXXX"'
      );
      continue;
    }

    return phone;
  }
};

export const phoneOptional = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    const phone = await conversation.form.text();
    if (phone == SKIP_SYMBOL) {
      return;
    }

    if (!phone.match(/^\+7\d{10}$/)) {
      await ctx.reply(
        'Неверный формат. Пожалуйста, введите номер телефона в формате "+7XXXXXXXXXX"'
      );
      continue;
    }

    return phone;
  }
};
