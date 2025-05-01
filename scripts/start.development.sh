cd services/core
pm2 start npm --name druzhinarus-bot-dev_core -- run start:dev
cd -

cd services/telegram
pm2 start npm --name druzhinarus-bot-dev_telegram -- run start:dev
cd -
