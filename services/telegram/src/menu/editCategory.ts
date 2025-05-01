import { Menu, MenuRange } from "@grammyjs/menu"

import { api } from "@/api"
import { Context } from "@/context"
import { WEEKDAYS } from "@/shared/constants"

export const editCategoryMenu = new Menu<Context>(`edit-category-menu`)
  .dynamic(async (ctx) => {
    const range = new MenuRange<Context>()

    const categoryId = ctx.session.currentCategoryId
    if (!categoryId) {
      return
    }

    range
      .text("Изменить название").row()
      .text("Изменить описание").row()
      .text("⚪️ Отображать название рубрики").row()
      .text("⚪️ Отображать номер поста").row()

    const schedule = await api.categories.getSchedule()
      .then(res => res.data)

    let counter = 0

    for (let i = 0; i < WEEKDAYS.length; i++) {
      range.text(`Расписание: ${WEEKDAYS[i]}`)
      range.row()

      for (let j = 9; j < 21; j++) {
        const s = schedule[i * 24 + j]
        const selected = s.categoryId === categoryId
        const selectedByOtherCategory = s.categoryId && s.categoryId !== categoryId

        let mark;
        if (selected) {
          mark = "🟢"
        } else if (selectedByOtherCategory) {
          mark = "🟠"
        } else {
          mark = "⚪️"
        }

        range.text(
          `${mark} ${s.hour.toString().padStart(2, "0")}:00`,
          async (ctx) => {
            if (selected) {
              await api.categories.updateSchedule({
                weekday: s.weekday,
                hour: s.hour,
                categoryId: null
              })

              ctx.menu.update()
            } else if (selectedByOtherCategory) {
              return
            } else {
              await api.categories.updateSchedule({
                weekday: s.weekday,
                hour: s.hour,
                categoryId: categoryId
              })

              ctx.menu.update()
            }
          }
        )

        if (counter % 4 == 3) {
          range.row()
        }
        counter++
      }
    }

    return range
  })
