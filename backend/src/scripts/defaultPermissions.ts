import Permission from "../modules/users/models/permissions.model.ts";
import Role from "../modules/users/models/roles.model.ts";
import { logger } from "../middleware/logger.ts";

const Permissions = async () => {
  try {
    const admin: Role | null = await Role.findOne({
      where: { title: "admin" },
    });

    const user: Role | null = await Role.findOne({
      where: { title: "user" },
    });

    if (admin === null || user === null)
      throw new Error("Default Roles has not been initialized");

    const AdminRoleId: string = admin.roleId;
    const UserRoleId: string = user.roleId;

    return await Permission.bulkCreate([
      { action: "create", roleId: UserRoleId, category: "post" },
      { action: "read", roleId: UserRoleId, category: "post" },
      { action: "update", roleId: UserRoleId, category: "post" },
      { action: "create", roleId: UserRoleId, category: "comment" },
      { action: "read", roleId: UserRoleId, category: "comment" },
      { action: "create", roleId: AdminRoleId, category: "user" },
      { action: "read", roleId: AdminRoleId, category: "user" },
      { action: "update", roleId: AdminRoleId, category: "user" },
      { action: "delete", roleId: AdminRoleId, category: "user" },
    ]);
  } catch (error) {
    logger.error(`Error initiating default permissions: ${error}`);
    throw error;
  }
};

export default Permissions;
