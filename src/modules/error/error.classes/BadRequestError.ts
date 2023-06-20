import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomAPIError {
  statusCode: number;
  constructor(message: string, data?: {}) {
    super(message, data);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
