npm run build
npm run migrate:prod
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules --exclude=.git ./ root@ngrink.ru:/srv/bots/druzhinarus-bot

ssh -p 2224 root@ngrink.ru <<'ENDSSH'
  cd /srv/bots/druzhinarus-bot
  source ~/.nvm/nvm.sh
  npm install
  npm run prisma:generate
  pm2 reload druzhinarus-bot
ENDSSH