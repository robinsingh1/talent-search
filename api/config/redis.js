import config from '../../src/config';
import redis from 'redis';
import bluebird from 'bluebird';

// Promisify!
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config.redisconn || process.env.REDISCLOUD_URL, {no_ready_check: true});

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

export default client;
