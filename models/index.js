const db = require("../config/db.js");

// ! Import models
const Article = require("./Article.model.js");
const User = require("./User.model.js");
const Notice = require("./Notice.model.js");

// ! Define associations
Article.hasMany(Notice, { foreignKey: "articleId" });
Notice.belongsTo(Article, { foreignKey: "articleId" });

User.hasMany(Notice, { foreignKey: "userId" });
Notice.belongsTo(User, { foreignKey: "userId" });

// ! Export models
module.exports = {
  db,
  Article,
  User,
  Notice,
  // Add other models here as needed
};
