import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

// role routes
router.get("/roles", Authorization.Authenticated, RoleController.GetRole);
router.get("/roles/:id", RoleController.GetRoleById);
router.post("/roles", RoleController.CreateRole);
router.patch("/roles/:id", RoleController.UpdateRole);
router.delete("/roles/:id", RoleController.DeleteRole);

// user routes
router.post(
  "/user/signup",
  UserValidation.RegisterValidation,
  UserController.RegisterUser
);
router.post("/user/login", UserController.LoginUser);
router.get("/user/refresh-token", UserController.RefreshToken);
router.get(
  "/user/profile",
  Authorization.Authenticated,
  UserController.UserDetail
);
router.get(
  "/user/logout",
  Authorization.Authenticated,
  UserController.UserLogout
);
export default router;
