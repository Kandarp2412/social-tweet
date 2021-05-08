module.exports = (sequelize, Sequelize) => {
  const comment_table = sequelize.define(
    "comment_table",
    {
      comment: {
        type: Sequelize.TEXT,
      },
    },
    { timestamps: true }
  );
  return comment_table;
};
