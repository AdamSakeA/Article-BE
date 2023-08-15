import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserData } from "../../interface/UserData";

dotenv.config();

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

export { GenerateToken, GenerateRefreshToken };
