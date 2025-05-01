import { Conversation } from "@grammyjs/conversations";

import { EventType } from "@/shared/generated/prisma/client";

import { api } from "@/api";
import { Context } from "@/context";
import { convutils } from "./convutils";

export async function addCategory(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('[Добавление рубрики]')

  await ctx.reply('1/2: Введите название рубрики')
  const categoryTitle = await conversation.form.text()
  await ctx.reply('2/2: Введите описание рубрики')
  const categoryDescription = await conversation.form.text()

  await conversation.external(async () => {
    await api.categories.createCategory({
      title: categoryTitle,
      description: categoryDescription,
    })
  })

  await ctx.reply('Рубрика добавлена')
}
