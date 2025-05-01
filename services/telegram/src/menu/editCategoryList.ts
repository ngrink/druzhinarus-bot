import { Menu, MenuRange } from "@grammyjs/menu"

import { api } from "@/api"
import { Context } from "@/context"
import { editCategoryMenu } from "@/menu"

export const editCategoryListMenu = new Menu<Context>("edit-category-list-menu")
  .dynamic(async () => {
    const range = new MenuRange<Context>()
    const categories = await api.categories.getAllCategories()
      .then(res => res.data)

    for (const category of categories) {
      range
        .text(
          {
            text: category.title,
          },
          async (ctx) => {
            ctx.session.currentCategoryId = category.id

            await ctx.reply(`Изменение рубрики:\n${category.title}\n\n${category.description}`, {
              reply_markup: editCategoryMenu
            })
          }
        )
       .row()
    }
    return range
  })
