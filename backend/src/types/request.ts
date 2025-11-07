import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

interface UserRequest extends Request {
  user?:
    | {
        userId: string;
        roleId: string;
        isVerified: boolean;
        iat?: number;
        exp?: number;
      }
    | JwtPayload;
}

interface UserResponse extends Response {
  message: string;
  errors: {
    errors: [
      {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
      }
    ];
  };
}

export type { UserRequest, UserResponse };
