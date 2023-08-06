import { Request, Response, NextFunction } from "express";
import Helpers from "../../helpers/Helpers";
import Validator, { Rules } from "validatorjs";
import User from "../../db/models/User";

const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, username, email, password, confirmPassword } = req.body;

    const data = { fullName, username, email, password, confirmPassword };

    const rules: Rules = {
      fullName: "required|string|max:50",
      username: ["required", "string", "max:30", "regex:/^@\\w+/"],
      email: "required|email",
      password: "required|min:8|max:12",
      confirmPassword: "required|same:password",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(Helpers.ResponseData(400, "Bad Request", validate.errors, null));
    }

    const userEmail = await User.findOne({
      where: {
        email: data.email,
      },
    });

    const userUserName = await User.findOne({
      where: {
        username: data.username,
      },
    });

    if (userUserName) {
      const errorData = {
        errors: {
          username: ["Username already used"],
        },
      };
      return res
        .status(400)
        .send(Helpers.ResponseData(400, "Bad Request", errorData, null));
    }

    if (userEmail) {
      const errorData = {
        errors: {
          email: ["Email already used"],
        },
      };
      return res
        .status(400)
        .send(Helpers.ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(Helpers.ResponseData(500, "", error, null));
  }
};

export default { RegisterValidation };
