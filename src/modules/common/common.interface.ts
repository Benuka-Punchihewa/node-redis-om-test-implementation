import mongoose, { ObjectId } from "mongoose";

interface IPagination {
  page: number;
  limit: number;
  orderBy: "asc" | "desc";
}

interface ICursorPagination {
  cursor: ObjectId | mongoose.Types.ObjectId | null;
  includeCursor: Boolean;
  limit: number;
  orderBy: -1 | 1;
  fetchDirection: "up" | "down";
}

interface IStringDictionary {
  [index: string]: string | number;
}

export { IPagination, ICursorPagination, IStringDictionary };
