import { Menu, MenuRange } from "@grammyjs/menu"

import { Context } from "@/bot/context"
import { settingsService } from "@/modules/settings"
import { rescheduleSendingPhotosJob } from "@/scheduler"

export const editPhotosScheduleMenu = new Menu<Context>("edit-photos-schedule-menu")
  .dynamic(async () => {
    const range = new MenuRange<Context>()

    const settings = await settingsService.getSettings()
    const selected = new Set(settings.photoSchedulerSpec.split(" ")[1].split(",").map(Number))
    
    for (let i = 0; i <= 23; i++) {
      const checked = selected.has(i)

      range.text(
        `${checked ? "🟢" : "⚪️"} ${i.toString().padStart(2, "0")}:00`, 
        async (ctx) => {
          if (checked) {
            selected.delete(i)
          } else {
            selected.add(i)
          }
          
          const spec = `0 ${[...selected].join(",")} * * *`
          await settingsService.updateSettings({
            photoSchedulerSpec: spec
          })
          rescheduleSendingPhotosJob(spec)
          ctx.menu.update()
        }
      )
      if (i % 3 == 2) {        
        range.row()
      }
    }


    return range
  })