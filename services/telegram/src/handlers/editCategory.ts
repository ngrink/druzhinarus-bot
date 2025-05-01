import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";
import { editCategoryListMenu } from "@/menu";

export const editCategoryHandler: Middleware<Context> = async (ctx: Context) => {
  const categories = await api.categories.getAllCategories()
    .then(res => res.data)

  if (!categories.length) {
    await ctx.reply('Нет доступных рубрик')
    return
  }

  await ctx.reply('Выберите рубрику для изменения', {
    reply_markup: editCategoryListMenu
  })
}
