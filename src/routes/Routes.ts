import express from "express";
import {
  RoleController,
  UserController,
  MasterMenuController,
} from "../controllers";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";
import ROUTES from "../config/route";
import MenuValidation from "../middleware/validation/MenuValidation";
import SubMenuController from "../controllers/SubMenuController";

const router = express.Router();

// Role routes
router
  .route(ROUTES.roles.base)
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
  .route(ROUTES.roles.id)
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

// User routes
router
  .route(ROUTES.user.signup)
  .post(UserValidation.RegisterValidation, UserController.RegisterUser);

router.route(ROUTES.user.login).post(UserController.LoginUser);

router.route(ROUTES.user.refresh_token).get(UserController.RefreshToken);

router
  .route(ROUTES.user.profile)
  .get(Authorization.Authenticated, UserController.UserDetail);

router
  .route(ROUTES.user.logout)
  .get(Authorization.Authenticated, UserController.UserLogout);

// Maste Menu Routes
router.post(
  "/menu",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MenuValidation.CreateMenuValidation,
  MasterMenuController.CreateMenu
);
router.get(
  "/menu",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.GetListMenu
);
router.get(
  "/menu/all",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.GetAllMenu
);
router.get(
  "/menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.GetDetailMenu
);
router.patch(
  "/menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.UpdateMenu
);
router.delete(
  "/menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.SoftDeleteMenu
);
router.delete(
  "/menu/permanent/:id",
  Authorization.Authenticated,
  Authorization.SuperUserRole,
  MasterMenuController.PermanentDeleteMenu
);

// SubMenu Routes
router.post(
  "/sub-menu",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MenuValidation.CreateSubMenuValidation,
  SubMenuController.CreateSubMenu
);
router.get(
  "/sub-menu",
  Authorization.AdminRole,
  Authorization.AdminRole,
  SubMenuController.GetListSubMenu
);
router.get(
  "/sub-menu/all",
  Authorization.AdminRole,
  Authorization.AdminRole,
  SubMenuController.GetAllSubMenu
);
router.get(
  "/sub-menu/:id",
  Authorization.AdminRole,
  Authorization.AdminRole,
  SubMenuController.GetDetailSubMenu
);
router.patch(
  "/sub-menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.UpdateSubMenu
);
router.delete(
  "/sub-menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  SubMenuController.SoftDeleteSubMenu
);
router.delete(
  "/sub-menu/:id",
  Authorization.Authenticated,
  Authorization.SuperUserRole,
  SubMenuController.PermanentDeleteSubMenu
);

export default router;
