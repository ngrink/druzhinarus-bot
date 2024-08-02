import { Menu, MenuRange } from "@grammyjs/menu";

import * as handlers from "@/handlers";
import { onlyAdmin } from "@/middlewares";
import { Context } from "@/bot/context";
import { createPrivateMiddleware, isAdmin, isPrivate } from "@/filters";

export const mainMenu = new Menu<Context>("main-menu")
  .text("Ближайшие мероприятия", handlers.upcomingEventsHandler).row()
  .text("Записаться в поход", 
    createPrivateMiddleware("Запись доступна в личных сообщениях бота"), 
    handlers.signupTripMenuHandler).row()
  .text("Часто задаваемые вопросы", handlers.faqHandler).row()
  
  .dynamic((ctx) => {
    const range = new MenuRange<Context>();
    if (isPrivate(ctx.chat?.type) && isAdmin(ctx.from!.id)) {
      range.submenu("Администрирование", "admin-menu", onlyAdmin)
    }
    return range
  })

export const administrationMenu = new Menu<Context>("admin-menu")
  .submenu("Мероприятия", "admin-events-menu").row()
  .submenu("Походы", "admin-trips-menu").row()
  .submenu("Посты", "admin-posts-menu").row()
  .submenu("Пользователи", "admin-users-menu").row()
  .back("<- Назад");

export const eventsMenu = new Menu<Context>("admin-events-menu")
  .text("Добавить мероприятие", handlers.addEventHandler).row()
  .text("Изменить мероприятие", handlers.editEventMenuHandler).row()
  .text("Удалить мероприятия", handlers.deleteEventMenuHandler).row()
  .back("<- Назад");

export const tripsMenu = new Menu<Context>("admin-trips-menu")
  .text("Добавить поход", handlers.addTripHandler).row()
  .text("Изменить поход", handlers.editTripMenuHandler).row()
  .text("Удалить походы", handlers.deleteTripMenuHandler).row()
  .text("Список участников", handlers.listTripMembers).row()
  .back("<- Назад");

export const postsMenu = new Menu<Context>("admin-posts-menu")
  .text("Очередь фотографий", handlers.showPhotosQueue).row()
  .text("Очистить очередь", handlers.clearPhotosQueue).row()
  .text("Расписание публикаций", handlers.editPhotosScheduleHandler).row()
  .back("<- Назад");

export const usersMenu = new Menu<Context>("admin-users-menu")
  .back("<- Назад");

administrationMenu.register(eventsMenu)
administrationMenu.register(tripsMenu)
administrationMenu.register(postsMenu)
administrationMenu.register(usersMenu)
mainMenu.register(administrationMenu)