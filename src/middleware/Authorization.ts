import { Request, Response, NextFunction } from "express";
import { ExtractToken } from "../helpers/token/Extract";
import ResponseData from "../helpers/ResponseData";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (token === null) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const result = ExtractToken(token!);

    if (!result) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    res.locals.userId = result.id;
    res.locals.roleId = result.roleId;

    next();
  } catch (error: any) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const SuperUserRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId: number = res.locals.roleId;

    if (roleId !== 1) {
      return res.status(403).send(ResponseData(403, "Forbbiden", null, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const AdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId: number = res.locals.roleId;

    if (roleId !== 2) {
      return res.status(403).send(ResponseData(403, "Forbbiden", null, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const UserRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId: number = res.locals.roleId;

    if (roleId !== 3) {
      return res.status(403).send(ResponseData(403, "Forbbiden", null, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const AdminAndSuperRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId: number = res.locals.roleId;

    if (roleId !== 1 && roleId !== 2) {
      return res.status(403).send(ResponseData(403, "Forbbiden", null, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default {
  Authenticated,
  SuperUserRole,
  AdminRole,
  UserRole,
  AdminAndSuperRole,
};
