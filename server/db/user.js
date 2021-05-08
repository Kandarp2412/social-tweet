module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      displayName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      photoURL: {
        type: Sequelize.TEXT,
      },
      id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      // Liked: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
    },
    { timestamps: true }
  );
  return user;
};
