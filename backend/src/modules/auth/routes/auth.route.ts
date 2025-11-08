import { Router } from "express";
import authenticate from "../../../middleware/isAuthenticated.ts";
import registerValidation from "../validate/register.validate.ts";
import RegisterController from "../controllers/register.controller.ts";
import LoginController from "../controllers/login.controller.ts";
import LogoutController from "../controllers/logout.controller.ts";
import RefreshController from "../controllers/refresh.controller.ts";
import EmailController from "../controllers/email.controller.ts";
import PasswordController from "../controllers/password.controller.ts";

const router = Router();
const registration = new RegisterController();
const login = new LoginController();
const logout = new LogoutController();
const refresh = new RefreshController();
const email = new EmailController();
const password = new PasswordController();

router.post("/register", registerValidation, registration.register);
router.post("/login", login.login);
router.post("/logout", logout.logout);

router.post("/refresh", authenticate, refresh.refresh);
router.post("/email", authenticate, email.send);
router.post("/email/:token", authenticate, email.verify);

router.post("/password/forget", password.forget);
router.post("/password/reset/:token", password.reset);

export default router;
