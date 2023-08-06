import { Request, Response, NextFunction } from "express";
import PasswordHelpers from "../helpers/PasswordHelpers";
import Helpers from "../helpers/Helpers";
import User from "../db/models/User";
import Role from "../db/models/Role";

const RegisterUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fullName, username, email, password, confirmPassword } = req.body;

    const hashed = await PasswordHelpers.PasswordHashing(password);

    const data = await User.create({
      fullName,
      username,
      email,
      password: hashed,
      active: true,
      verified: true,
      roleId: 3,
    });

    return res
      .status(201)
      .send(Helpers.ResponseData(201, "Success Created User", null, data));
  } catch (error) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

const LoginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, username, password } = req.body;

    let user;

    if (email) {
      user = await User.findOne({ where: { email } });
    }

    if (!user && username) {
      user = await User.findOne({ where: { username } });
    }

    if (!user) {
      return res
        .status(401)
        .send(Helpers.ResponseData(401, "Unauthorized", null, null));
    }

    const matched = await PasswordHelpers.PasswordCompare(
      password,
      user.password
    );

    if (!matched) {
      return res
        .status(401)
        .send(Helpers.ResponseData(401, "Unauthorized", null, null));
    }

    const dataUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
    };

    const token = Helpers.GenerateToken(dataUser);
    const refreshToken = Helpers.GenerateRefreshToken(dataUser);

    user.accessToken = refreshToken;

    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
      token: token,
    };

    return res
      .status(200)
      .send(Helpers.ResponseData(200, "OK", null, responseUser));
  } catch (error) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .send(Helpers.ResponseData(401, "Unauthorized", null, null));
    }

    const decodedUser = Helpers.ExtractRefreshToken(refreshToken);

    if (!decodedUser) {
      return res
        .status(401)
        .send(Helpers.ResponseData(401, "Unauthorized", null, null));
    }

    const token = Helpers.GenerateToken({
      id: decodedUser.id,
      username: decodedUser.username,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });

    const resultUser = {
      id: decodedUser.id,
      username: decodedUser.username,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
      token: token,
    };

    return res
      .status(200)
      .send(Helpers.ResponseData(200, "OK", null, resultUser));
  } catch (error) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

const UserDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId: number = res.locals.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: Role,
        attributes: ["id", "roleName"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(Helpers.ResponseData(404, "User not found", null, null));
    }

    user.password = "";
    user.accessToken = "";

    return res.status(200).send(Helpers.ResponseData(200, "OK", null, user));
  } catch (error) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

const UserLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(200)
        .send(Helpers.ResponseData(200, "User Logout", null, null));
    }

    const userId = res.locals.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .send(Helpers.ResponseData(200, "User Logout", null, null));
    }

    await user.update({ accessToken: null }, { where: { id: userId } });
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .send(Helpers.ResponseData(200, "User Logout", null, null));
  } catch (error) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

export default {
  RegisterUser,
  LoginUser,
  RefreshToken,
  UserDetail,
  UserLogout,
};
