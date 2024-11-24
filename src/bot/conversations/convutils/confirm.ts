import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";


export const confirm = async (conversation: Conversation<Context>, ctx: Context) => {
  const text = await conversation.form.text()

  if (text.toLocaleLowerCase() != "да") {
    return false
  }

  return true
}

export const confirmOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  const text = await conversation.form.text()
  if (text == SKIP_SYMBOL) {
    return false
  }

  if (text.toLocaleLowerCase() != "да") {
    return false
  }

  return true
}
