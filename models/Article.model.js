const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

// ! Define Article model
const Article = db.define(
  "Article",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // required field
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // required field
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false, // required field
      unique: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false, // required field
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false, // required field
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // required field
      defaultValue: false,
    },
    picture: {
      type: DataTypes.JSON,
      allowNull: true, // required field
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
    underscored: true, // use snake_case for column names
  }
);

module.exports = Article;
