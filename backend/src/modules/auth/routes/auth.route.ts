import { Router } from "express";
import type { Request, Response } from "express";
import registerValidation from "../validate/register.validate.ts";
import RegisterController from "../controllers/register.controller.ts";
import LoginController from "../controllers/login.controller.ts";
import LogoutController from "../controllers/logout.controller.ts";
import RefreshController from "../controllers/refresh.controller.ts";
import type { UserRequest } from "../../../types/request.ts";

const router = Router();
const registration = new RegisterController();
const login = new LoginController();
const logout = new LogoutController();
const refresh = new RefreshController();

router.post("/register", registerValidation, (req: Request, res: Response) =>
  registration.register(req, res)
);
router.post("/login", (req: Request, res: Response) => login.login(req, res));
router.post("/logout", (req: Request, res: Response) =>
  logout.logout(req, res)
);
router.post("/refresh", (req: Request, res: Response) =>
  refresh.refresh(req as UserRequest, res)
);

export default router;
