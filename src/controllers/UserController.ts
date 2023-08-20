import { Request, Response } from "express";
import { Op } from "sequelize";
import { GenerateRefreshToken, GenerateToken } from "../helpers/token/Generate";
import { ExtractRefreshToken } from "../helpers/token/Extract";
import { User, Role } from "../db/models/";
import RoleMenuAccess from "../db/models/RoleMenuAccess";
import MasterMenu from "../db/models/MasterMenu";
import SubMenu from "../db/models/SubMenu";
import { PasswordHashing, PasswordCompare } from "../helpers/PasswordHelpers";
import ResponseData from "../helpers/ResponseData";

const RegisterUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fullName, username, email, password, roleId, confirmPassword } =
      req.body;

    const hashed = await PasswordHashing(password);

    const data = await User.create({
      fullName,
      username,
      email,
      password: hashed,
      active: true,
      verified: true,
      roleId: roleId,
    });

    return res
      .status(201)
      .send(ResponseData(201, "Success Created User", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
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
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const matched = await PasswordCompare(password, user.password);

    if (!matched) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const dataUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
    };

    const token = GenerateToken(dataUser);
    const refreshToken = GenerateRefreshToken(dataUser);

    user.accessToken = refreshToken;

    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const roleAccess = await RoleMenuAccess.findAll({
      where: {
        roleId: user.roleId,
        active: true,
      },
    });

    const listSubMenuId = roleAccess.map((item) => {
      return item.subMenuId;
    });

    const menuAccess = await MasterMenu.findAll({
      where: {
        active: true,
      },
      order: [
        ["ordering", "ASC"],
        [SubMenu, "ordering", "ASC"],
      ],
      include: {
        model: SubMenu,
        where: {
          id: { [Op.in]: listSubMenuId },
        },
      },
    });

    const responseUser = {
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
      token: token,
      menuAccess: menuAccess,
    };

    return res.status(200).send(ResponseData(200, "OK", null, responseUser));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const decodedUser = ExtractRefreshToken(refreshToken);

    if (!decodedUser) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const token = GenerateToken({
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

    return res.status(200).send(ResponseData(200, "OK", null, resultUser));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
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
        .send(ResponseData(404, "User not found", null, null));
    }

    user.password = "";
    user.accessToken = "";

    return res.status(200).send(ResponseData(200, "OK", null, user));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const UserLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).send(ResponseData(200, "User Logout", null, null));
    }

    const userId = res.locals.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      res.clearCookie("refreshToken");
      return res.status(200).send(ResponseData(200, "User Logout", null, null));
    }

    await user.update({ accessToken: null }, { where: { id: userId } });
    res.clearCookie("refreshToken");
    return res.status(200).send(ResponseData(200, "User Logout", null, null));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default {
  RegisterUser,
  LoginUser,
  RefreshToken,
  UserDetail,
  UserLogout,
};
