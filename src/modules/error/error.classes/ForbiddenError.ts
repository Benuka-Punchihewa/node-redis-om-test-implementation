import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class ForbiddenError extends CustomAPIError {
  statusCode: number;
  constructor(message: string, data?: {}) {
    super(message, data);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default ForbiddenError;
