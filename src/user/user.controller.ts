import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRedisService from "./user.redis/user.redis.service";

const createUser = async (req: Request, res: Response) => {
  const { sanitizedInputs } = req.body;

  await UserRedisService.createUser(sanitizedInputs);
  const rUser = await UserRedisService.getUser(sanitizedInputs.id);

  return res.status(StatusCodes.CREATED).json(rUser);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const rUser = await UserRedisService.getUser(id);

  return res.status(StatusCodes.OK).json(rUser);
};

export default { createUser, getUserById };
