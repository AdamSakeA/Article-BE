import { Request, Response } from "express";
import RoleMenuAccess from "../db/models/RoleMenuAccess";
import ResponseData from "../helpers/ResponseData";
import SubMenu from "../db/models/SubMenu";
import { Role } from "../db/models";

const CreateAccess = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleId, subMenuId } = req.body;

    const data = await RoleMenuAccess.create({
      roleId,
      subMenuId,
      active: true,
    });

    return res
      .status(201)
      .send(ResponseData(201, "Success Create Access", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await RoleMenuAccess.findAll({
      where: {
        active: true,
      },
      include: [
        {
          model: SubMenu,
          attributes: ["name"],
        },
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });

    return res
      .status(200)
      .send(ResponseData(200, "Success Get List Access", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetAllList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await RoleMenuAccess.findAll({
      include: [
        {
          model: SubMenu,
          attributes: ["name"],
        },
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });

    return res
      .status(200)
      .send(ResponseData(200, "Success Get All List Access", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    return res
      .status(200)
      .send(ResponseData(200, "Success Get List Access", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const UpdateAccess = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { roleId, subMenuId } = req.body;

    const data = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    data.roleId = roleId;
    data.subMenuId = subMenuId;

    await data.save();

    return res
      .status(200)
      .send(ResponseData(200, "Success Update Access", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const SoftDelete = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    data.active = false;

    await data.save();

    return res
      .status(200)
      .send(
        ResponseData(200, "Success Delete Active False Access", null, data)
      );
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const PermanentDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: false,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    await data.destroy();

    return res
      .status(200)
      .send(
        ResponseData(200, "Success Delete Permanent Role Menu", null, data)
      );
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default {
  CreateAccess,
  GetList,
  GetAllList,
  GetDetail,
  UpdateAccess,
  SoftDelete,
  PermanentDelete,
};
