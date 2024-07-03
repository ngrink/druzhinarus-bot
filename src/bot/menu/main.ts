import { Menu } from "@grammyjs/menu";

import * as handlers from "@/handlers";
import { onlyAdmin } from "@/middlewares";
import { Context } from "@/bot/context";

export const mainMenu = new Menu<Context>("main-menu")
  .text("Ближайшие мероприятия", handlers.upcomingEventsHandler).row()
  .text("Записаться в поход", handlers.signupTripHandler).row()
  .text("Часто задаваемые вопросы", handlers.faqHandler).row()
  .submenu("Администрирование", "admin-menu", onlyAdmin)

export const administrationMenu = new Menu<Context>("admin-menu")
  .submenu("Мероприятия", "admin-events-menu").row()
  .submenu("Походы", "admin-trips-menu").row()
  .submenu("Посты", "admin-posts-menu").row()
  .back("<- Назад");

export const eventsMenu = new Menu<Context>("admin-events-menu")
  .text("Добавить мероприятие", handlers.addEventHandler).row()
  .text("Изменить мероприятие", handlers.editEventHandler).row()
  .text("Удалить мероприятия", handlers.deleteEventHandler).row()
  .back("<- Назад");

export const tripsMenu = new Menu<Context>("admin-trips-menu")
  .text("Список участников", async (ctx) => {ctx.reply("4")}).row()
  .text("Добавить поход", handlers.addTripHandler).row()
  .text("Изменить поход", handlers.editTripHandler).row()
  .text("Удалить походы", handlers.deleteTripHandler).row()
  .back("<- Назад");

export const postsMenu = new Menu<Context>("admin-posts-menu")
  .text("Запланировать посты", (ctx) => ctx.reply("7")).row()
  .text("Очистить запланированные посты", (ctx) => ctx.reply("8")).row()
  .back("<- Назад");

administrationMenu.register(eventsMenu)
administrationMenu.register(tripsMenu)
administrationMenu.register(postsMenu)
mainMenu.register(administrationMenu)