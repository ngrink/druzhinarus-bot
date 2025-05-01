export const adminIds = process.env.BOT_ADMINS 
  ? process.env.BOT_ADMINS.split(",").map(Number)
  : []
