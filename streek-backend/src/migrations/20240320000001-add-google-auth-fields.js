module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('Users', 'picture', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Update existing users to have 'local' as authProvider
    await queryInterface.sequelize.query(`
      UPDATE "Users"
      SET "authProvider" = 'local'
      WHERE "authProvider" IS NULL;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'googleId');
    await queryInterface.removeColumn('Users', 'picture');
  },
}; 