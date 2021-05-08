var Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "bazijjz8tczocx35s7ru",
  "uojh02inkwlffqmm",
  "CeIGL3HeuumXUKHq6Yzj",
  {
    host: "bazijjz8tczocx35s7ru-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

let db = {};
db.sequelize = sequelize;
db.post = require("./post")(sequelize, Sequelize);
db.likeTable = require("./likeTable")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.follow_table = require("./follow_table")(sequelize, Sequelize);
db.comment_table = require("./comment_table")(sequelize, Sequelize);
db.seen_post = require("./seen_post")(sequelize, Sequelize);

//foreign key

// db.like.belongsTo(db.post, { as: "post" });
// db.post.hasMany(db.like, { foreignKey: "postId", as: "post" });

db.likeTable.belongsTo(db.post, { as: "post" });
db.post.hasMany(db.likeTable, { foreignKey: "postId", as: "post" });

db.likeTable.belongsTo(db.user, { as: "user" });
db.user.hasMany(db.likeTable, { foreignKey: "userId" });

db.post.belongsTo(db.user, { as: "user" });
db.user.hasMany(db.post, { foreignKey: "userId", as: "user" });

db.follow_table.belongsTo(db.user, { as: "user", onDelete: "cascade" });
db.user.hasMany(db.follow_table, {
  foreignKey: "userId",
  // allowNull: false,
  constraints: true,
});

db.follow_table.belongsTo(db.user, { as: "follower", onDelete: "cascade" });
db.user.hasMany(db.follow_table, {
  foreignKey: "followerId",
  constraints: true,
});

db.comment_table.belongsTo(db.post, { as: "post" });
db.post.hasMany(db.comment_table, { foreignKey: "postId" });

db.comment_table.belongsTo(db.user, { as: "user" });
db.user.hasMany(db.comment_table, { foreignKey: "userId" });

db.seen_post.belongsTo(db.post, { as: "post" });
db.post.hasMany(db.seen_post, { foreignKey: "postId" });

db.seen_post.belongsTo(db.user, { as: "user" });
db.user.hasMany(db.seen_post, { foreignKey: "userId" });

module.exports = db;
