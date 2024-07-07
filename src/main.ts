import 'config'
import '@/scheduler'

import { Bot, session } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import { conversations, createConversation } from '@grammyjs/conversations';

import * as commands from '@/commands';
import * as handlers from '@/handlers';
import * as builders from '@/conversations';
import { Context, sessionOptions } from '@/bot/context';
import { onlyAdminOnDevelopment } from '@/middlewares';
import { errorHandler } from '@/bot/error';
import { deleteEventMenu, deleteTripMenu, editEventMenu, editTripMenu, mainMenu, signupTripsMenu, tripsMembersMenu } from '@/menu';
import { isAdminFilter, privateFilter } from '@/filters';

if (!process.env.BOT_TOKEN) {
  throw new Error("Bot token is not defined");
}

export const bot = new Bot<Context>(process.env.BOT_TOKEN);

async function main() {
  await commands.setCommands(bot)

  bot.use(onlyAdminOnDevelopment)
  bot.use(hydrate())
  bot.use(session(sessionOptions))
  bot.use(conversations());

  bot.callbackQuery("cancel", async (ctx) => {
    await ctx.conversation.exit();
    await ctx.answerCallbackQuery();
    await ctx.reply('Операция отменена')
  });

  bot.command("cancel", commands.cancelCommand);

  bot.use(createConversation(builders.addEvent))
  bot.use(createConversation(builders.editEvent))
  bot.use(createConversation(builders.deleteEvent))
  bot.use(createConversation(builders.addTrip))
  bot.use(createConversation(builders.editTrip))
  bot.use(createConversation(builders.deleteTrip))
  bot.use(createConversation(builders.signupTrip))

  bot.use(editEventMenu)
  bot.use(deleteEventMenu)
  bot.use(editTripMenu)
  bot.use(deleteTripMenu)
  bot.use(signupTripsMenu)
  bot.use(tripsMembersMenu)
  bot.use(mainMenu);

  bot.command("start", commands.startCommand);
  bot.command('menu', commands.menuCommand);
  bot.command('id', commands.getIdCommand);

  bot
    .on("message:photo")
    .filter(privateFilter)
    .filter(isAdminFilter, handlers.uploadPhotosHandler)

  bot.on("message", (ctx) => {
    if (ctx.message.text) {
      ctx.reply("Команда не распознана")
    }
  })

  bot.catch(errorHandler)

  console.log('Starting bot...');
  bot.start();
}

main()