export const notificationChatIds = process.env.BOT_NOTIFICATION_CHATS?.split(",").map(Number) || []