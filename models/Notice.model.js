const { DataTypes } = require("sequelize");
const db = require("../config/db");

// ! Define Notice model
const Notice = db.define(
  "Notice",
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // required field
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false, // required field
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
    underscored: true, // use snake_case for column names
  }
);

module.exports = Notice;
