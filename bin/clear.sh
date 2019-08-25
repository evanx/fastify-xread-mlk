set -e
if [ $NODE_ENV != 'development' ]
then
  echo "Unsupported NODE_ENV: $NODE_ENV"
  exit 1
else
  redis-cli del fr:mystream:x
  redis-cli keys 'fr:*' | xargs -n1 redis-cli del
fi
