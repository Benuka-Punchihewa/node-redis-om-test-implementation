import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class ConflictError extends CustomAPIError {
  statusCode: number;
  constructor(message: string, data?: {}) {
    super(message, data);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictError;
