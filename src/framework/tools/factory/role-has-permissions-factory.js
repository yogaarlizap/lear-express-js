// or, if using CommonJS
const roleModel = require("../../database/mysql/models/roles");
const permissionModel = require("../../database/mysql/models/permissions");

const roleHasPermissions = (sequelize) => {
  const roles = (roleName) => {
    const role = roleModel(sequelize);
    role.findOne({
      where: { name: roleName },
    });
  };
  const permissions = (permissionName) => {
    const permission = permissionModel(sequelize);
    permission.findOne({
      where: { name: permissionName },
    });
  };
  return [
    {
        roleId: roles("Superadmin").id,
        permissionId: permissions("Manage User").id,
    },
    {
        roleId: roles("Superadmin").id,
        permissionId: permissions("View User").id,
    },
    {
        roleId: roles("Admin").id,
        permissionId: permissions("Manage User").id,
    },
    {
        roleId: roles("Admin").id,
        permissionId: permissions("View User").id,
    }
  ];
}

module.exports = roleHasPermissions;
