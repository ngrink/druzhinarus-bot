export const distributionChatIds = process.env.BOT_DISTRIBUTION_CHATS 
  ? process.env.BOT_DISTRIBUTION_CHATS.split(",").map(Number)
  : []
