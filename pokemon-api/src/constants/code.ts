import { ErrorCode } from "../types/message";

export const RESPONSE_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  INVALID_PARAM: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERR_CODES: ErrorCode = {
  EC_BAD_REQUEST: "EC_BAD_REQUEST",
  EC_NOT_FOUND: "EC_NOT_FOUND",
};
