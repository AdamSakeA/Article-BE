import express from "express";
import { RoleMenuAccessController } from "../controllers";
import { MenuValidation } from "../middleware/validation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router
  .route("/")
  .post(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    MenuValidation.CreateRoleMenuAccess,
    RoleMenuAccessController.CreateAccess
  )
  .get(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleMenuAccessController.GetList
  );

router
  .route("/all")
  .get(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleMenuAccessController.GetAllList
  );

router
  .route("/:id")
  .get(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleMenuAccessController.GetDetail
  )
  .patch(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    MenuValidation.CreateRoleMenuAccess,
    RoleMenuAccessController.UpdateAccess
  )
  .delete(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleMenuAccessController.SoftDelete
  );

router
  .route("/permanent/:id")
  .delete(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleMenuAccessController.PermanentDelete
  );

export default router;
