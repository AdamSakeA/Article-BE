import { Request, Response } from "express";
import ResponseData from "../helpers/ResponseData";
import MasterMenu from "../db/models/MasterMenu";

const CreateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, icon, ordering } = req.body;

    const data = await MasterMenu.create({
      name,
      icon,
      ordering,
      active: true,
    });

    return res
      .status(201)
      .send(ResponseData(201, "Success Created Menu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetListMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await MasterMenu.findAll({
      where: {
        active: true,
      },
    });

    return res
      .status(200)
      .send(ResponseData(200, "Success Get Menu Status Active", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetAllMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await MasterMenu.findAll();

    return res
      .status(200)
      .send(ResponseData(200, "Success Get All Menu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const GetDetailMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await MasterMenu.findOne({
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

    return res
      .status(200)
      .send(ResponseData(200, "Success Get Detail Menu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const UpdateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, icon, ordering } = req.body;

    const data = await MasterMenu.findOne({
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

    await data.save();

    return res
      .status(201)
      .send(ResponseData(201, "Success Update Menu", null, null));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const SoftDeleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await MasterMenu.findOne({
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

    data.active = false;

    await data.save();

    return res
      .status(200)
      .send(ResponseData(200, "Success Set Active False", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

const PermanentDeleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await MasterMenu.findOne({
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

    await data.destroy();

    return res
      .status(200)
      .send(ResponseData(200, "Success Delete Permanent Menu", null, data));
  } catch (error) {
    return res.status(500).send(ResponseData(500, "", error, null));
  }
};

export default {
  CreateMenu,
  GetListMenu,
  GetAllMenu,
  GetDetailMenu,
  UpdateMenu,
  SoftDeleteMenu,
  PermanentDeleteMenu,
};
