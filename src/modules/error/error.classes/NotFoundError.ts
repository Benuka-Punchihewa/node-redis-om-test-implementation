import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError {
  statusCode: number;
  constructor(message: string, data?: {}) {
    super(message, data);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
