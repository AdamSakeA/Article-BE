import { Request, Response, NextFunction } from "express";
import ResponseData from "../../helpers/ResponseData";
import Validator, { Rules } from "validatorjs";
import MasterMenu from "../../db/models/MasterMenu";
import SubMenu from "../../db/models/SubMenu";
import { Role } from "../../db/models";

const CreateMenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, ordering } = req.body;
    const data = { name, icon, ordering };

    const rules: Rules = {
      name: "required|string|max:50",
      icon: "required|string",
      ordering: "required|integer",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", validate.errors, null));
    }

    const menuName = await MasterMenu.findOne({
      where: {
        name: data.name,
      },
    });

    const menuIcon = await MasterMenu.findOne({
      where: {
        icon: data.icon,
      },
    });

    if (menuName) {
      const errorData = {
        errors: {
          name: ["Menu Name already used"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    if (menuIcon) {
      const errorData = {
        errors: {
          icon: ["icon already used"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const CreateSubMenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const data = {
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
    };

    const rules: Rules = {
      name: "required|string|max:50",
      masterMenuId: "required|integer",
      url: "required|string",
      title: "required|string|max:50",
      icon: "required|string",
      ordering: "required|integer",
      isTargetSelf: "required|boolean",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", validate.errors, null));
    }

    const masterMenu = await MasterMenu.findOne({
      where: {
        id: masterMenuId,
        active: true,
      },
    });

    if (!masterMenu) {
      const errorData = {
        errors: {
          masterMenuId: ["Master menu's not found"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    const subMenuName = await SubMenu.findOne({
      where: {
        name: data.name,
      },
    });

    const subMenuIcon = await SubMenu.findOne({
      where: {
        icon: data.icon,
      },
    });

    const subMenuUrl = await SubMenu.findOne({
      where: {
        url: data.url,
      },
    });

    if (subMenuName) {
      const errorData = {
        errors: {
          name: ["SubMenu Name already used"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    if (subMenuIcon) {
      const errorData = {
        errors: {
          icon: ["SubMenu Icon already used"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    if (subMenuUrl) {
      const errorData = {
        errors: {
          url: ["SubMenu URL already used"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const CreateRoleMenuAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId, subMenuId } = req.body;

    const data = {
      roleId,
      subMenuId,
    };

    const rules: Rules = {
      roleId: "required|integer",
      subMenuId: "required|integer",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", validate.errors, null));
    }

    const role = await Role.findOne({
      where: {
        id: roleId,
        active: true,
      },
    });

    if (!role) {
      const errorData = {
        errors: {
          roleId: ["Role's not found"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    const subMenu = await SubMenu.findOne({
      where: {
        id: subMenuId,
        active: true,
      },
    });

    if (!subMenu) {
      const errorData = {
        errors: {
          subMenuId: ["SubMenu not found"],
        },
      };
      return res
        .status(400)
        .send(ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default {
  CreateMenuValidation,
  CreateSubMenuValidation,
  CreateRoleMenuAccess,
};
