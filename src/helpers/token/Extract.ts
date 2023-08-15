import { ResponseExtractToken } from "../../types/ResponseExtractToken";
import { UserData } from "../../interface/UserData";
import jwt from "jsonwebtoken";

const ExtractToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_TOKEN as string;

  let responseData: ResponseExtractToken;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      responseData = null;
    } else {
      responseData = decoded;
    }
  });

  if (responseData) {
    const result: UserData = <UserData>responseData;
    return result;
  }

  return null;
};

const ExtractRefreshToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_REFRESH_TOKEN as string;

  let responseData: ResponseExtractToken;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      responseData = null;
    } else {
      responseData = decoded;
    }
  });

  if (responseData) {
    const result: UserData = <UserData>responseData;

    return result;
  }

  return null;
};

export { ExtractRefreshToken, ExtractToken };
