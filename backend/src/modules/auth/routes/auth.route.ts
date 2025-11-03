import { Router } from "express";
import type { Request, Response } from "express";
import registerValidation from "../validate/register.validate.ts";
import RegisterController from "../controllers/register.controller.ts";

const router = Router();
const registration = new RegisterController();

router.post("/register", registerValidation, (req: Request, res: Response) =>
  registration.register(req, res)
);

export default router;
