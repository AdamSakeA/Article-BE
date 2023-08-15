import { Request, Response } from "express";
import ResponseData from "../helpers/ResponseData";
import SubMenu from "../db/models/SubMenu";

const CreateSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const data = await SubMenu.create({
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
      active: true,
    });

    return res
      .status(201)
      .send(ResponseData(201, "Success Created Sub Menu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetListSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await SubMenu.findAll({
      where: {
        active: true,
      },
    });

    return res
      .status(200)
      .send(ResponseData(200, "Success Get SubMenu Status Active", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetAllSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await SubMenu.findAll();

    return res
      .status(200)
      .send(ResponseData(200, "Success Get All SubMenu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetDetailSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "SubMenu Not Found", null, null));
    }

    return res
      .status(200)
      .send(ResponseData(200, "Success Get Detail SubMenu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const UpdateSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const data = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "Menu Not Found", null, null));
    }

    data.name = name;
    data.icon = icon;
    data.ordering = ordering;
    data.masterMenuId = masterMenuId;
    data.url = url;
    data.title = title;
    data.isTargetSelf = isTargetSelf;

    await data.save();

    return res
      .status(201)
      .send(ResponseData(201, "Success Update SubMenu", null, null));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const SoftDeleteSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "SubMenu Not Found", null, null));
    }

    data.active = false;

    await data.save();

    return res
      .status(200)
      .send(ResponseData(200, "Success Set Active False", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const PermanentDeleteSubMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!data) {
      return res
        .status(404)
        .send(ResponseData(404, "SubMenu Not Found", null, null));
    }

    await data.destroy();

    return res
      .status(200)
      .send(ResponseData(200, "Success Delete Permanent SubMenu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default {
  CreateSubMenu,
  GetListSubMenu,
  GetAllSubMenu,
  GetDetailSubMenu,
  UpdateSubMenu,
  SoftDeleteSubMenu,
  PermanentDeleteSubMenu,
};
