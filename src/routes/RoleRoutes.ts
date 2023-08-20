import express from "express";
import { RoleController } from "../controllers";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router
  .route("/")
  .get(
    Authorization.Authenticated,
    Authorization.AdminAndSuperRole,
    RoleController.GetRole
  )
  .post(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleController.CreateRole
  );

router
  .route("/:id")
  .get(
    Authorization.Authenticated,
    Authorization.AdminAndSuperRole,
    RoleController.GetRoleById
  )
  .patch(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleController.UpdateRole
  )
  .delete(
    Authorization.Authenticated,
    Authorization.SuperUserRole,
    RoleController.DeleteRole
  );

export default router;
