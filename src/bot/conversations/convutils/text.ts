import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";


export const text = async (conversation: Conversation<Context>, ctx: Context) => {
  return conversation.form.text()
}

export const textOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  const text = await conversation.form.text()
  if (text == SKIP_SYMBOL) {
    return
  }

  return text
}
