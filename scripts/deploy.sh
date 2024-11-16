npm run build
npm run migrate:prod
rsync -rzvh -u -e 'ssh -p 2224' --mkpath --progress --delete --exclude=node_modules --exclude=.git ./ ngrink@ngrink.ru:/home/ngrink/bots/druzhinarus-bot/

ssh -p 2224 ngrink@ngrink.ru << 'ENDSSH'
  cd /home/ngrink/bots/druzhinarus-bot
  source ~/.nvm/nvm.sh
  npm install
  npm run prisma:generate
  pm2 reload druzhinarus-bot
ENDSSH
