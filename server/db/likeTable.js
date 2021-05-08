module.exports = (sequelize, Sequelize) => {
  const likeTable = sequelize.define(
    "likeTable",
    {
      // uid: {
      //   type: Sequelize.STRING,
      // },
    },
    { timestamps: true }
  );
  return likeTable;
};
