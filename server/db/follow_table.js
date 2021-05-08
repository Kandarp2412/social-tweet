module.exports = (sequelize, Sequelize) => {
  const follow_table = sequelize.define(
    "follow_table",
    {
      // followerId: {
      //   type: Sequelize.STRING,
      // },
    },
    { timestamps: true }
  );
  return follow_table;
};
