import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";
import { isURL } from "@/shared/helpers";

export const url = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    const url = await conversation.form.text();

    if (!isURL(url)) {
      await ctx.reply("Введите корректную ссылку");
      continue;
    }

    return url;
  }
};

export const urlOptional = async (
  conversation: Conversation<Context>,
  ctx: Context
) => {
  while (true) {
    const url = await conversation.form.text();
    if (url === SKIP_SYMBOL) {
      return;
    }

    if (!isURL(url)) {
      await ctx.reply("Введите корректную ссылку");
      continue;
    }

    return url;
  }
};
