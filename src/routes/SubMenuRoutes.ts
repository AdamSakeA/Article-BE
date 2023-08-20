import express from "express";
import { SubMenuController } from "../controllers";
import { MenuValidation } from "../middleware/validation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router
  .route("/")
  .post(
    Authorization.Authenticated,
    Authorization.AdminRole,
    MenuValidation.CreateSubMenuValidation,
    SubMenuController.CreateSubMenu
  )
  .get(
    Authorization.Authenticated,
    Authorization.AdminRole,
    SubMenuController.GetListSubMenu
  );

router
  .route("/all")
  .get(
    Authorization.Authenticated,
    Authorization.AdminRole,
    SubMenuController.GetAllSubMenu
  );

router
  .route("/:id")
  .get(
    Authorization.Authenticated,
    Authorization.AdminRole,
    SubMenuController.GetDetailSubMenu
  )
  .patch(
    Authorization.Authenticated,
    Authorization.AdminRole,
    SubMenuController.UpdateSubMenu
  )
  .delete(
    Authorization.Authenticated,
    Authorization.AdminRole,
    SubMenuController.SoftDeleteSubMenu
  );

router
  .route("/permanent/:id")
  .delete(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    SubMenuController.PermanentDeleteSubMenu
  );

export default router;
