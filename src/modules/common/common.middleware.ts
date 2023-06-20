import { Request, Response, NextFunction } from "express";
import BadRequestError from "../error/error.classes/BadRequestError";
import { IPagination } from "./common.interface";
import mongoose from "mongoose";

const paginate = async (req: Request, res: Response, next: NextFunction) => {
  let page: number | string = (req.query.page as string) || 1;
  let limit: number | string = (req.query.limit as string) || 8;
  let orderBy: string = (req.query.orderBy as string) || "desc";

  page = parseInt(page as string);
  if (!page) throw new BadRequestError("Page number should be a number!");

  limit = parseInt(limit as string);
  if (!limit) throw new BadRequestError("Page limit should be a number!");

  if (orderBy != "asc" && orderBy != "desc") {
    throw new BadRequestError('Sorting order should be "asc" or "desc!"');
  }

  req.pageable = { page, limit, orderBy };

  next();
};

const cursorPaginate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cursor: string = req.query.cursor as string;
  let includeCursor = req.query.includeCursor === "true";
  let limit: number | string = (req.query.limit as string) || 8;
  let orderBy: any = (req.query.orderBy as string) || "desc";
  let fetchDirection = req.query.fetchDirection || "down";

  if (orderBy === "desc") {
    orderBy = -1;
  } else {
    orderBy = 1;
  }

  if (fetchDirection !== "up" && fetchDirection !== "down")
    throw new BadRequestError(`Fetch direction should be "up" or "down"!`);

  limit = parseInt(limit as string);
  if (!limit) throw new BadRequestError("Page limit should be a number!");

  const parsedCursor = cursor ? new mongoose.Types.ObjectId(cursor) : null;

  req.cursorPageable = {
    cursor: parsedCursor,
    includeCursor,
    limit,
    orderBy,
    fetchDirection,
  };

  next();
};

export default { paginate, cursorPaginate };
