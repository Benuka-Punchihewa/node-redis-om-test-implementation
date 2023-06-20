import { createClient } from "redis";
import { Client } from "redis-om";

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

RedisClient.connect();

RedisClient.on("connect", () => {
  console.log("CLIENT CONNECTED TO REDIS");
});

RedisClient.on("ready", () => {
  console.log("REDIS CLIENT READY TO BE USED");
});

RedisClient.on("error", (err: any) => {
  console.log("ERROR : " + err.message);
});

RedisClient.on("end", () => {
  console.log("CLIENT DISCONNECTED FROM REDIS");
});

process.on("SIGINT", () => {
  RedisClient.quit();
});

const getRedisOmClient = async () => {
  const RedisOMClient = await new Client().use(RedisClient);
  return RedisOMClient;
};

export default { RedisClient, getRedisOmClient };
