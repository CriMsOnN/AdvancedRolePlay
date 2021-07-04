const { promisify } = require("util");
const redis = require("redis");
const pogger = require("pogger");
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const ttlAsync = promisify(client.ttl).bind(client);

const cacheSet = async (key, value) => {
  return await setAsync(key, JSON.stringify(value));
};

const cacheGet = async (key) => {
  const data = await getAsync(key);
  return JSON.parse(data);
};

module.exports = {
  getAsync,
  setAsync,
  setexAsync,
  ttlAsync,
  cacheSet,
  cacheGet,
};
