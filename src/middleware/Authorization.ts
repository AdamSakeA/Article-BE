import { Request, Response, NextFunction } from "express";
import Helpers from "../helpers/Helpers";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (token === null) {
      return res
        .status(401)
        .send(Helpers.ResponseData(401, "Unauthorized", null, null));
    }

    const result = Helpers.ExtractToken(token!);

    if (!result) {
      return res
        .status(401)
        .send(Helpers.ResponseData(401, "Unauthorized", null, null));
    }

    res.locals.userId = result.id;

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

export default { Authenticated };
