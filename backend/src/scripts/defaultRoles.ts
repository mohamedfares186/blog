import { logger } from "../middleware/logger.ts";
import Role from "../modules/users/models/roles.model.ts";

const Roles = async () => {
  try {
    return await Role.bulkCreate([
      { title: "admin", level: 9999 },
      { title: "user", level: 1234 },
    ]);
  } catch (error) {
    logger.error(`Error initiating default roles: ${error}`);
    throw error;
  }
};

export default Roles;
