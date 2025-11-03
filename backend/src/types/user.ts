import type { DateDataType } from "sequelize";

interface UserType {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  password?: string;
  roleId?: string;
  isVerified?: boolean;
  dateOfBirth?: DateDataType;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { UserType };
