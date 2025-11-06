import type { Request, Response } from "express";

interface UserRequest extends Request {
  user: {
    userId: string;
    role: string;
    isVerified: boolean;
  };
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
