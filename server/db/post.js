module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define(
    "post",
    {
      description: {
        type: Sequelize.TEXT,
      },
      postImg: {
        type: Sequelize.TEXT,
      },
      // uid: {
      //   type: Sequelize.STRING,
      // },
      // Liked: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
    },
    { timestamps: true }
  );
  return post;
};
