module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add authProvider enum type
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Users_authProvider" AS ENUM ('local', 'google', 'apple');
    `);

    // Add authProvider column
    await queryInterface.addColumn('Users', 'authProvider', {
      type: Sequelize.ENUM('local', 'google', 'apple'),
      defaultValue: 'local',
      allowNull: false,
    });

    // Add authProviderId column
    await queryInterface.addColumn('Users', 'authProviderId', {
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
    await queryInterface.removeColumn('Users', 'authProviderId');
    await queryInterface.removeColumn('Users', 'authProvider');
    
    // Drop the enum type
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_Users_authProvider";
    `);
  },
}; 