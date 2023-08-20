import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  RoleRoutes,
  UserRoutes,
  MasterMenuRoutes,
  SubMenuRoutes,
  RoleMenuAccessRoutes,
} from "./routes/";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ message: `${process.env.APP_NAME} - API` });
});

app.use("/roles", RoleRoutes);
app.use("/user", UserRoutes);
app.use("/menu", MasterMenuRoutes);
app.use("/sub-menu", SubMenuRoutes);
app.use("/role-menu-access", RoleMenuAccessRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running on port ${process.env.APP_PORT}`
  );
});
