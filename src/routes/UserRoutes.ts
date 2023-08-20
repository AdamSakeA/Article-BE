import express from "express";
import { UserController } from "../controllers";
import { UserValidation } from "../middleware/validation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router
  .route("/signup")
  .post(UserValidation.RegisterValidation, UserController.RegisterUser);

router.route("/login").post(UserController.LoginUser);

router.route("/refresh-token").get(UserController.RefreshToken);

router
  .route("/profile")
  .get(Authorization.Authenticated, UserController.UserDetail);

router
  .route("/logout")
  .get(Authorization.Authenticated, UserController.UserLogout);

export default router;
