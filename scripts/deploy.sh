rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./dist root@ngrink.ru:/srv/bots/druzhinarus-bot
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./.env.production root@ngrink.ru:/srv/bots/druzhinarus-bot

ssh -p 2224 root@ngrink.ru <<'ENDSSH'
  cd /srv/bots/druzhinarus-bot
  source ~/.nvm/nvm.sh
  npm install
  pm2 reload druzhinarus-bot
ENDSSH