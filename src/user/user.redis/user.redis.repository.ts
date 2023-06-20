import { Entity, Schema } from "redis-om";
import RedisConfig from "../../config/redis.config";

interface User {
  id: string;
  name: string;
  dob: Date;
  address: string;
  contactNumber: string;
}
class User extends Entity {}
const userSchema = new Schema(User, {
  id: { type: "string", indexed: true },
  name: { type: "text" },
  dob: { type: "date" },
  address: { type: "string" },
  contactNumber: { type: "string" },
});

interface Child {
  id: string;
  parentId: string;
  name: string;
  dob: Date;
}
class Child extends Entity {}
const childSchema = new Schema(Child, {
  id: { type: "string" },
  parentId: { type: "string", indexed: true },
  name: { type: "string" },
  dob: { type: "date" },
});

const getUserRepository = async () => {
  const RedisOMClient = await RedisConfig.getRedisOmClient();
  const userRepository = RedisOMClient.fetchRepository(userSchema);
  return userRepository;
};

const getChildRepository = async () => {
  const RedisOMClient = await RedisConfig.getRedisOmClient();
  const childRepository = RedisOMClient.fetchRepository(childSchema);
  return childRepository;
};

export default { getUserRepository, getChildRepository };
