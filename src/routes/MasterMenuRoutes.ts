import express from "express";
import { MasterMenuController } from "../controllers";
import { MenuValidation } from "../middleware/validation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router
  .route("/")
  .post(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MenuValidation.CreateMenuValidation,
    MasterMenuController.CreateMenu
  )
  .get(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MasterMenuController.GetListMenu
  );

router
  .route("/all")
  .get(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MasterMenuController.GetAllMenu
  );

router
  .route("/:id")
  .get(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MasterMenuController.GetDetailMenu
  )
  .patch(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MasterMenuController.UpdateMenu
  )
  .delete(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MasterMenuController.SoftDeleteMenu
  );

router
  .route("/permanent/:id")
  .delete(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    MasterMenuController.PermanentDeleteMenu
  );

export default router;
