import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const registerValidation = [
  body("firstName")
    .notEmpty()
    .trim()
    .isString()
    .withMessage("First Name is required"),
  body("lastName")
    .notEmpty()
    .trim()
    .isString()
    .withMessage("Last Name is required"),
  body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
  body("username")
    .notEmpty()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage("Username may contain only letters, numbers and underscore"),

  body("password")
    .notEmpty()
    .trim()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(
      "Password must include at least one letter, one number and one special character"
    ),

  body("repeatPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  body("dateOfBirth")
    .notEmpty()
    .trim()
    .isDate()
    .withMessage("Date of birth is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export default registerValidation;
