import jwt from "jsonwebtoken";

export type ResponseExtractToken =
  | string
  | jwt.JwtPayload
  | jwt.VerifyErrors
  | undefined
  | null;
