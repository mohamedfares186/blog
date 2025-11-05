import Role from "../modules/users/models/roles.model.ts";

const defaultRoles = async () => {
  try {
    await Role.create({
      title: "admin",
      level: 9999,
    });
    await Role.create({
      title: "user",
      level: 1234,
    });
  } catch (error) {
    console.log(error);
  }
};

defaultRoles();
