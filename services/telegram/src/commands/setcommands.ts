import { Bot } from "grammy";
import { Context } from "@/context";

export const setCommands = async (bot: Bot<Context>) => {
  await bot.api.setMyCommands([
    {
      command: 'start',
      description: 'Запуск бота'
    },
    {
      command:'menu',
      description: 'Главное меню'
    },
    {
      command:'help',
      description: 'Справка по чат-боту'
    },
    {
      command: 'cancel',
      description: 'Отмена текущей операции'
    },
  ])
}
