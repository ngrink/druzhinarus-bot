import { Bot, session } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import { conversations, createConversation } from "@grammyjs/conversations";

import "@/config";
import "./scheduler";
import * as commands from "./commands";
import * as handlers from "./handlers";
import * as builders from "./conversations";
import * as middlewares from "./middlewares";
import * as menu from "./menu";
import { Context, sessionOptions } from "./context";
import { errorHandler } from "./error";
import { isAdminFilter, privateFilter } from "./filters";

if (!process.env.BOT_TOKEN) {
  throw new Error("Bot token is not defined");
}

export const bot = new Bot<Context>(process.env.BOT_TOKEN);

async function main() {
  await commands.setCommands(bot);

  bot.use(middlewares.onlyAdminOnDevelopment);
  bot.use(middlewares.checkUser);
  bot.use(hydrate());
  bot.use(session(sessionOptions));
  bot.use(conversations());

  bot.callbackQuery("cancel", async (ctx) => {
    await ctx.conversation.exit();
    await ctx.answerCallbackQuery();
    await ctx.reply("Операция отменена");
  });

  bot.command("cancel", commands.cancelCommand);

  bot.use(createConversation(builders.addEvent));
  bot.use(createConversation(builders.editEvent));
  bot.use(createConversation(builders.deleteEvent));
  bot.use(createConversation(builders.addTrip));
  bot.use(createConversation(builders.editTrip));
  bot.use(createConversation(builders.deleteTrip));
  bot.use(createConversation(builders.signupTrip));
  bot.use(createConversation(builders.addCategory));

  bot.use(menu.editCategoryMenu);
  bot.use(menu.editCategoryListMenu);
  bot.use(menu.editEventMenu);
  bot.use(menu.deleteEventMenu);
  bot.use(menu.editTripMenu);
  bot.use(menu.deleteTripMenu);
  bot.use(menu.signupTripsMenu);
  bot.use(menu.tripsMembersMenu);
  bot.use(menu.editPhotosScheduleMenu);
  bot.use(menu.mainMenu);

  bot.command("start", commands.startCommand);
  bot.command("menu", commands.menuCommand);
  bot.command("help", commands.helpCommand);
  bot.command("id", commands.getIdCommand);

  bot
    .on("message:photo")
    .filter(privateFilter)
    .filter(isAdminFilter, handlers.uploadPhotosHandler);

  bot.on("message", (ctx) => {
    if (ctx.message.text) {
      ctx.reply("Команда не распознана");
    }
  });

  bot.catch(errorHandler);

  console.log("Starting bot...");
  bot.start();
}

main();
