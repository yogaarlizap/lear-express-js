'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('UserHasRoles', { 
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model : 'users',
          key   : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model : 'roles',
          key   : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('UserHasRoles');
  }
};
