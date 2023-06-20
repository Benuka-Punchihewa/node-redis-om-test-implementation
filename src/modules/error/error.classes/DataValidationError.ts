import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

type KeyValuePair = Array<{ key: string; message: string | number }>;

class DataValidationError extends CustomAPIError {
  statusCode: number;
  keyValuePairs: KeyValuePair;
  constructor(keyValuePairs: KeyValuePair) {
    super("");
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.keyValuePairs = keyValuePairs;
  }
}

export default DataValidationError;
