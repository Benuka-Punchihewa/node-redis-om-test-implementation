import ConflictError from "../../modules/error/error.classes/ConflictError";
import { IUser } from "../user.interface";
import userRedisRepository from "./user.redis.repository";

const createUser = async (user: IUser) => {
  const userRepository = await userRedisRepository.getUserRepository();
  const childRepository = await userRedisRepository.getChildRepository();
  const promiseArray: Array<Promise<any>> = [];

  // duplication validation
  const userObj = await getUserRedisObjectById(user.id);
  if (userObj) throw new ConflictError(`A user with ID, "${user.id}" exists!`);

  const userEntity = userRepository.createEntity();
  userEntity.id = user.id;
  userEntity.name = user.name;
  userEntity.dob = user.dob;
  userEntity.address = user.address;
  userEntity.contactNumber = user.contactNumber;

  promiseArray.push(userRepository.save(userEntity));

  for (const child of user.children) {
    // duplication validation
    const userObj = await getChildRedisObjectById(child.id);
    if (userObj)
      throw new ConflictError(`A child with ID, "${child.id}" exists!`);

    const childEntity = childRepository.createEntity();
    childEntity.id = child.id;
    childEntity.parentId = user.id;
    childEntity.name = child.name;
    childEntity.dob = child.dob;

    promiseArray.push(childRepository.save(childEntity));
  }

  // resolve promises
  await Promise.all(promiseArray);
};

const getUserRedisObjectById = async (id: string) => {
  const userRepository = await userRedisRepository.getUserRepository();
  return userRepository.search().where("id").equals(id).return.first();
};

const getChildRedisObjectById = async (id: string) => {
  const userRepository = await userRedisRepository.getChildRepository();
  return userRepository.search().where("id").equals(id).return.first();
};

const getChildrenRedisObjectByParentId = async (parentId: string) => {
  const childRepository = await userRedisRepository.getChildRepository();
  return childRepository
    .search()
    .where("parentId")
    .equals(parentId)
    .returnAll();
};

const getUser = async (userId: string) => {
  const [userObj, childrenObjs] = await Promise.all([
    getUserRedisObjectById(userId),
    getChildrenRedisObjectByParentId(userId),
  ]);

  let user: any | null = null;
  if (userObj && childrenObjs)
    user = {
      ...userObj.toJSON(),
      children: childrenObjs,
    };

  return user;
};

export default { createUser, getUser };
