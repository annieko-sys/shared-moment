#!/bin/bash
set -u

cd "$(dirname "$0")" || exit 1
if [ ! -f out/index.html ]; then
  printf 'The website has not been built yet. Run pnpm build, then try again.\n'
  read -r -p 'Press Return to close this window.'
  exit 1
fi

URL='http://127.0.0.1:3002/'
if curl --silent --fail --output /dev/null "$URL"; then
  open "$URL"
  printf 'Shared Moment is already running at %s\n' "$URL"
  exit 0
fi

python3 -m http.server 3002 --bind 127.0.0.1 --directory out &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null' EXIT INT TERM

for attempt in 1 2 3 4 5 6 7 8 9 10; do
  if curl --silent --fail --output /dev/null "$URL"; then
    open "$URL"
    printf 'Shared Moment is open at %s\nKeep this Terminal window open while you use the local preview.\n' "$URL"
    wait "$SERVER_PID"
    exit $?
  fi
  sleep 1
done

printf 'The preview could not start. Check whether port 3002 is already in use.\n'
exit 1
