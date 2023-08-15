import { Request, Response } from "express";
import ResponseData from "../helpers/ResponseData";
import Role from "../db/models/Role";

const GetRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await Role.findAll({
      where: {
        active: true,
      },
    });

    return res
      .status(200)
      .send(ResponseData(200, "Successfully Get All Role", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const CreateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;

    const create = await Role.create({
      roleName,
      active,
    });

    return res
      .status(201)
      .send(ResponseData(201, "Success Created Role", null, create));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const UpdateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    role.roleName = roleName;
    role.active = active;

    await role.save();

    return res
      .status(200)
      .send(ResponseData(200, "Success Update Role", null, role));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const DeleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    await role.destroy();

    return res
      .status(200)
      .send(ResponseData(200, "Successfully Deleted Role", null, null));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res
        .status(404)
        .send(ResponseData(404, "Data not found", null, null));
    }

    return res
      .status(200)
      .send(ResponseData(200, "Get Role By Id", null, role));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default { GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById };
