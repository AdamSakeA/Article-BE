import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  roleId: number | null;
  verified: boolean | null;
  active: boolean | null;
}

const ResponseData = (
  statusCode: number,
  message?: string | null,
  error?: any | null,
  data?: any | null
) => {
  if (error !== null && error instanceof Error) {
    const response = {
      status: statusCode,
      message: error.message,
      errors: error,
      data: null,
    };

    return response;
  }

  const res = {
    status: statusCode,
    message: message,
    errors: error,
    data: data,
  };

  return res;
};

const GenerateToken = (data: UserData): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: "1h",
  });

  return token;
};

const GenerateRefreshToken = (data: UserData): string => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "1d",
  });

  return token;
};

const ExtractToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_TOKEN as string;

  let responseData:
    | string
    | jwt.JwtPayload
    | jwt.VerifyErrors
    | undefined
    | null;

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

  let responseData:
    | string
    | jwt.JwtPayload
    | jwt.VerifyErrors
    | undefined
    | null;

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

export default {
  ResponseData,
  GenerateToken,
  GenerateRefreshToken,
  ExtractToken,
  ExtractRefreshToken,
};
