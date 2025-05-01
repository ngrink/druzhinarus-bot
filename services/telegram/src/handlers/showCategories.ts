import { Middleware } from "grammy";

import { formatMessage } from "@/shared/helpers";

import { Context } from "@/context";
import { api } from "@/api";


export const showCategoriesHandler: Middleware<Context> = async (ctx: Context) => {
  const categories = await api.categories.getAllCategories()
    .then(res => res.data)

  if (!categories.length) {
    await ctx.reply('Нет рубрик')
    return
  }

  await ctx.reply(formatMessage`
    Список рубрик:

    ${categories
      .map((category, index) => {
        return formatMessage`
          ${index + 1}\. ${category.title}
          ${category.description}
        `
      })
      .join('\n\n')
    }
  `)
}
