import Roles from "./defaultRoles.ts";
import Permissions from "./defaultPermissions.ts";
import AdminUser from "./initiateAdmin.ts";
import { logger } from "../middleware/logger.ts";

const admin = new AdminUser();

try {
  await Roles();
  await Permissions();
  await admin.Run();
} catch (error) {
  logger.error(error);
  throw error;
}
