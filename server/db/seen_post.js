module.exports = (sequelize, Sequelize) => {
  const seen_post = sequelize.define(
    "seen_post",
    {
      // followerId: {
      //   type: Sequelize.STRING,
      // },
    },
    { timestamps: true }
  );
  return seen_post;
};
