cd services/core
npm run build
pm2 start npm --name druzhinarus-bot_core -- run start:prod
cd -

cd services/telegram
npm run build
pm2 start npm --name druzhinarus-bot_telegram -- run start:prod
cd -
