import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "./user.interface";
import UserRedisService from "./user.redis/user.redis.service";

const createUser = async (req: Request, res: Response) => {
  const { sanitizedInputs } = req.body;
  console.log(sanitizedInputs);
  await UserRedisService.createUser(sanitizedInputs);
  const rUser = await UserRedisService.getUser(sanitizedInputs.id);

  return res.status(StatusCodes.CREATED).json(rUser);
};

export default { createUser };
