import {
  ICursorPagination,
  IPagination,
} from "./modules/common/common.interface";

declare module "express-serve-static-core" {
  interface Request {
    pageable: IPagination;
    cursorPageable: ICursorPagination;
  }
}
