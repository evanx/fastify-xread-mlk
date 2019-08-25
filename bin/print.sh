set -x

redis-cli keys 'fr:*'
redis-cli xread streams fr:mystream:x 0 
redis-cli xrange fr:mystream:x - +
