import { IUser } from "../user.interface";
import userRedisRepository from "./user.redis.repository";

const createUser = async (user: IUser) => {
  const userRepository = await userRedisRepository.getUserRepository();
  const childRepository = await userRedisRepository.getChildRepository();

  console.log(user);

  const userEntity = userRepository.createEntity();
  userEntity.id = user.id;
  userEntity.name = user.name;
  userEntity.dob = user.dob;
  userEntity.address = user.address;
  userEntity.contactNumber = user.contactNumber;

  await userRepository.save(userEntity);

  for (const child of user.children) {
    const childEntity = childRepository.createEntity();
    childEntity.id = child.id;
    childEntity.parentId = user.id;
    childEntity.name = child.name;
    childEntity.dob = child.dob;

    await childRepository.save(childEntity);
  }
};

const getUserRedisObject = async (id: string) => {
  const userRepository = await userRedisRepository.getUserRepository();
  return userRepository.fetch(id);
};

const getChildrenRedisObject = async (parentId: string) => {
  const childRepository = await userRedisRepository.getChildRepository();
  return childRepository
    .search()
    .where("parentId")
    .equals(parentId)
    .returnAll();
};

const getUser = async (userId: string) => {
  const [userObj, childrenObj] = await Promise.all([
    getUserRedisObject(userId),
    getChildrenRedisObject(userId),
  ]);

  const user: IUser = {
    ...userObj,
    children: childrenObj,
  };

  return user;
};

export default { createUser, getUser };
